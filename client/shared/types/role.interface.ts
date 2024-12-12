export type RoleType = 'employee' | 'employer';

export interface RoleDto {
  userId: string;
  roleName: RoleType;
}
