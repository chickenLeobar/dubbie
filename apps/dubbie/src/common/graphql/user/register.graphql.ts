import { gql } from "graphql-request";

import { ERROR_RESULT_FRAGMENT } from "../../../common/graphql/fragments.graphql";

export const REGISTER = gql`
  mutation Register($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
      ...ErrorResult
    }
  }
  ${ERROR_RESULT_FRAGMENT}
`;
