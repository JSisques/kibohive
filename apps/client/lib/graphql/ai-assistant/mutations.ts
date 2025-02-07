import { gql } from '@apollo/client';

export const EXECUTE_USER_QUERY = gql`
  mutation ExecuteUserQuery($input: CreateUserQueryInput!) {
    executeUserQuery(input: $input) {
      response
    }
  }
`;
