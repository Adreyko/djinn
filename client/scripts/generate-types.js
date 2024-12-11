const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const TYPES_DIR = 'shared/types';
const API_URL = 'http://localhost:3001/swagger.json';

if (!fs.existsSync(TYPES_DIR)) {
  fs.mkdirSync(TYPES_DIR, { recursive: true });
}

function createTypeFile(name, content) {
  const baseName = name.replace(/\.ts$/, '');
  const fileName = path.join(TYPES_DIR, `${baseName}.ts`);
  fs.writeFileSync(fileName, content);
  console.log(`Generated ${fileName}`);
}

http
  .get(API_URL, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      try {
        const swagger = JSON.parse(data);
        const types = new Set();

        if (swagger.components?.schemas) {
          Object.entries(swagger.components.schemas).forEach(
            ([name, schema]) => {
              if (schema.type === 'string' && schema.enum) {
                createTypeFile(
                  name,
                  `export type ${name} = ${schema.enum
                    .map((v) => `'${v}'`)
                    .join(' | ')};`
                );
                types.add(name);
              } else if (schema.type === 'object') {
                const imports = [];
                const properties = Object.entries(schema.properties || {})
                  .map(([propName, prop]) => {
                    let propType = 'any';
                    if (prop.$ref) {
                      const refType = prop.$ref.split('/').pop();
                      imports.push(refType);
                      propType = refType;
                    } else if (prop.type === 'array') {
                      if (prop.items.$ref) {
                        const refType = prop.items.$ref.split('/').pop();
                        imports.push(refType);
                        propType = `${refType}[]`;
                      } else {
                        propType = `${prop.items.type}[]`;
                      }
                    } else {
                      propType = prop.type;
                    }
                    const isRequired = schema.required?.includes(propName);
                    return `  ${propName}${
                      isRequired ? '' : '?'
                    }: ${propType};`;
                  })
                  .join('\n');

                const importStatements = [...new Set(imports)]
                  .map((type) => `import { ${type} } from './${type}';`)
                  .join('\n');

                createTypeFile(
                  name,
                  `${importStatements}\n\nexport interface ${name} {\n${properties}\n}`
                );
                types.add(name);
              }
            }
          );

          const indexContent = Array.from(types)
            .map((type) => `export * from './${type}';`)
            .join('\n');

          createTypeFile('index', indexContent);
        }
      } catch (error) {
        console.error('Error generating types:', error);
        process.exit(1);
      }
    });
  })
  .on('error', (err) => {
    console.error('Error fetching swagger.json:', err);
    process.exit(1);
  });
