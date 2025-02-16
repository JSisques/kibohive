import { gql } from '@apollo/client';

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $description: String) {
    createTeam(name: $name, description: $description) {
      id
    }
  }
`;
