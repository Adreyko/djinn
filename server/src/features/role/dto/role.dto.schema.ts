import { z } from 'zod';

export const RoleDtoSchema = z.object({
  userId: z.string(),
  roleName: z.string(),
});

export type RoleDto = z.infer<typeof RoleDtoSchema>;
