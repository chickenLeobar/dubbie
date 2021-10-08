import { useContext, createContext, PropsWithChildren } from "react";
import { GraphQLClient } from "graphql-request";
import client from "@dubbie/lib/graphql-request";

const RequestClientContext = createContext<{ client: GraphQLClient }>(
  undefined!
);

export const RequestCLientProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <RequestClientContext.Provider value={{ client: client }}>
      {children}
    </RequestClientContext.Provider>
  );
};

export const useClientRequest = () => {
  const value = useContext(RequestClientContext);
  return value.client;
};
