import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
  query GetTeams {
    getTeams {
      id
      name
      description
    }
  }
`;
