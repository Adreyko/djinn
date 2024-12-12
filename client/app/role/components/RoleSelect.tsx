'use client';
import { useUser } from '@/core/user';
import { useGetRoles } from '@/shared/api/hooks/role/useGetRoles';
import useMutateUserRole from '@/shared/api/hooks/role/useMutateUserRole';

import { Button } from '@/shared/components/ui/button';
import GroupedSelect from '@/shared/components/ui/select';
import { RoleType } from '@/shared/types/role.interface';

import { FC, useEffect, useState } from 'react';

interface RoleSelectProps {
  onSuccess: (role: RoleType) => void;
}

const RoleSelect: FC<RoleSelectProps> = ({ onSuccess }) => {
  const [role, setRole] = useState<RoleType | null>(null);

  const { user } = useUser();

  const { data: roles, isLoading } = useGetRoles();

  const { mutate, isSuccess } = useMutateUserRole();

  const roleOptions =
    roles?.map((role) => ({
      value: role,
      label: getRoleLabel(role),
    })) ?? [];

  useEffect(() => {
    if (isSuccess) onSuccess(role as RoleType);
  }, [isSuccess]);

  if (isLoading)
    return (
      <div className='animate-pulse h-20 w-80'>
        <div className='h-4 bg-gray-300 rounded mb-4'></div>
        <div className='h-10 bg-gray-300 rounded mb-4'></div>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    );

  return (
    <div className='w-80'>
      <p>Please choose what you need!</p>
      <div className='flex flex-col gap-2'>
        <GroupedSelect
          label='I want to...'
          onChange={setRole}
          placeholder='Role'
          items={roleOptions}
        />
        <Button
          onClick={() =>
            mutate({
              userId: user?.clerkId ?? '',
              roleName: role ?? 'employee',
            })
          }
          disabled={!role}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const getRoleLabel = (role: string) => {
  if (role === 'employer') return 'I want to find someone to do some job';
  if (role === 'employee') return 'I want to find a job';
  return 'Unknown role';
};

export default RoleSelect;
