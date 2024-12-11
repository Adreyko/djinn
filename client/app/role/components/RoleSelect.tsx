'use client';
import { useGetRoles } from '@/shared/api/hooks/role/useGetRoles';
import useMutateUserRole from '@/shared/api/hooks/role/useMutateUserRole';

import { Button } from '@/shared/components/ui/button';
import GroupedSelect from '@/shared/components/ui/select';
import { RoleType } from '@/shared/types/roletype.types';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const RoleSelect = () => {
  const [role, setRole] = useState<RoleType | null>(null);

  const { user } = useUser();

  const { data: roles, isLoading } = useGetRoles();

  const { mutate, isSuccess } = useMutateUserRole();

  const roleOptions =
    roles?.data?.map((role) => ({
      value: role,
      label: getRoleLabel(role),
    })) ?? [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-col gap-2'>
      <GroupedSelect
        label='I want to...'
        onChange={setRole}
        placeholder='Role'
        items={roleOptions}
      />
      <Button
        onClick={() =>
          mutate({ userId: user?.id ?? '', roleName: role ?? 'employee' })
        }
        disabled={!role}
      >
        Continue
      </Button>
    </div>
  );
};

const getRoleLabel = (role: string) => {
  if (role === 'employer') return 'I want to find someone to do some job';
  if (role === 'employee') return 'I want to find a job';
  return 'Unknown role';
};

export default RoleSelect;
