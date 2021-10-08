import { GraphQLClient } from "graphql-request";

const endponint = "http://localhost:3000/shop-api";

const client = new GraphQLClient(endponint);

export default client;
