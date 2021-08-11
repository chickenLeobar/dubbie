import { useClientRequest } from "@dubbie/core/contexts/requetContex";
import { isBrowser } from "@dubbie/globals/contants";
export const useFetchData = <TData, TVariables>(
  query: string
): (() => Promise<TData>) => {
  // it is safe to call React Hooks here.
  let client = useClientRequest();
  return async (variables?: TVariables) => {
    if (localStorage && localStorage.getItem("token")) {
      client = client.setHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
      console.log("token added");
    }
    // authorization: `Bearer ${authToken}`,
    const { data, headers } = await client.rawRequest<TData, TVariables>(
      query,
      variables
    );
    // save token in local
    if (isBrowser) {
      // safe localStorage
      if (headers.get("vendure-auth-token") != null) {
        localStorage.setItem("token", headers.get("vendure-auth-token"));
      }
    }
    return data;
  };
};
