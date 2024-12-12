'use client';

import { useAuth } from '@clerk/nextjs';
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query';
import http from '../http';
import { AxiosError } from 'axios';

const addAuthHeader = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export function useAuthedQuery<TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  const { getToken } = useAuth();

  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const headers = await addAuthHeader(getToken);
      const { data } = await http.get<TData>(url, { headers });
      return data;
    },
    ...options,
  });
}

export function useAuthedMutation<
  TData = unknown,
  TVariables = unknown,
  TError = AxiosError
>(
  url: string,
  method: 'post' | 'put' | 'delete' = 'post',
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) {
  const { getToken } = useAuth();

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const headers = await addAuthHeader(getToken);
      const { data } = await http[method]<TData>(url, variables, { headers });
      return data;
    },
    ...options,
  });
}
