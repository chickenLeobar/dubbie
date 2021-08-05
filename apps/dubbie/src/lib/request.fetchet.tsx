import { useClientRequest } from "@dubbie/core/contexts/requetContex";
export const useFetchData = <TData, TVariables>(
  query: string
): (() => Promise<TData>) => {
  // it is safe to call React Hooks here.
  const client = useClientRequest();
  return async (variables?: TVariables) => {
    return client.request<TData, TVariables>(query, variables);
  };
};
