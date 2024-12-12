'use client';
import { useGetUser } from '@/shared/api/hooks/user/useGetUser';
import { User } from '@/shared/types/user.interface';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { UserResource } from '@clerk/types';

interface CombinedUser extends User {
  clerkData?: Partial<UserResource>;
}

interface UserContext {
  user: CombinedUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const context = createContext<UserContext>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

export const useUser = () => useContext(context);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: backendUser, isLoading: isBackendLoading } = useGetUser();

  const {
    isLoaded: isClerkLoaded,
    isSignedIn,
    user: clerkUser,
  } = useClerkUser();

  const isLoading = isBackendLoading || !isClerkLoaded;

  const combinedUser: CombinedUser | null = backendUser
    ? {
        ...backendUser,
        clerkData: clerkUser
          ? {
              emailAddresses: clerkUser.emailAddresses,
              phoneNumbers: clerkUser.phoneNumbers,
              externalAccounts: clerkUser.externalAccounts,
              externalId: clerkUser.externalId,
              primaryEmailAddressId: clerkUser.primaryEmailAddressId,
              primaryEmailAddress: clerkUser.primaryEmailAddress,
              primaryPhoneNumberId: clerkUser.primaryPhoneNumberId,
              primaryPhoneNumber: clerkUser.primaryPhoneNumber,
            }
          : undefined,
      }
    : null;

  return (
    <context.Provider
      value={{
        user: combinedUser,
        isLoading,
        isAuthenticated: !!isSignedIn,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default UserProvider;
