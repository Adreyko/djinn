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
  const fileName = path.join(TYPES_DIR, `${name}.types.ts`);
  fs.writeFileSync(fileName, content);
  console.log(`Generated ${fileName}`);
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getDependencies(schema, dependencies = new Set()) {
  if (schema.$ref) {
    const refType = schema.$ref.split('/').pop();
    dependencies.add(refType);
  } else if (schema.type === 'array' && schema.items) {
    getDependencies(schema.items, dependencies);
  } else if (schema.type === 'object' && schema.properties) {
    Object.values(schema.properties).forEach((prop) => {
      getDependencies(prop, dependencies);
    });
  }
  return dependencies;
}

function generateImports(dependencies, currentType) {
  return Array.from(dependencies)
    .filter((dep) => dep !== currentType) // Don't import self
    .map((dep) => `import { ${dep} } from './${dep.toLowerCase()}.types';`)
    .join('\n');
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
        const typeDefinitions = new Map();

        // Process schemas
        if (swagger.components?.schemas) {
          Object.entries(swagger.components.schemas).forEach(
            ([name, schema]) => {
              const dependencies = getDependencies(schema);
              let typeContent = '';
              const imports = generateImports(dependencies, name);

              if (imports) {
                typeContent += imports + '\n\n';
              }

              if (schema.type === 'string' && schema.enum) {
                typeContent += `export type ${name} = ${schema.enum
                  .map((v) => `'${v}'`)
                  .join(' | ')};`;
              } else if (schema.type === 'object') {
                const properties = Object.entries(schema.properties)
                  .map(([propName, prop]) => {
                    let propType = 'string';
                    if (prop.$ref) {
                      propType = prop.$ref.split('/').pop();
                    } else if (prop.type === 'array') {
                      if (prop.items.$ref) {
                        propType = `${prop.items.$ref.split('/').pop()}[]`;
                      } else {
                        propType = `${prop.items.type}[]`;
                      }
                    } else if (prop.type === 'string' && prop.enum) {
                      propType = prop.enum.map((v) => `'${v}'`).join(' | ');
                    } else {
                      propType = prop.type || 'string';
                    }
                    const isRequired = schema.required?.includes(propName);
                    return `  ${propName}${
                      isRequired ? '' : '?'
                    }: ${propType};`;
                  })
                  .join('\n');

                typeContent += `export interface ${name} {\n${properties}\n}`;
              }

              typeDefinitions.set(name.toLowerCase(), typeContent);
            }
          );
        }

        // Generate files
        typeDefinitions.forEach((content, name) => {
          createTypeFile(name, content);
        });
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
