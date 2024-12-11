'use client';
import { useGetRoles } from '@/shared/api/hooks/role/useGetRoles';
import { Button } from '@/shared/components/ui/button';
import GroupedSelect from '@/shared/components/ui/select';
import React, { useState } from 'react';

const RoleSelect = () => {
  const [role, setRole] = useState<string | null>(null);

  const { data: roles, isLoading } = useGetRoles();

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
      <Button disabled={!role}>Continue</Button>
    </div>
  );
};

const getRoleLabel = (role: string) => {
  if (role === 'employee') return 'I want to find someone to do some job';
  if (role === 'employer') return 'I want to find a job';
  return 'Unknown role';
};

export default RoleSelect;
