import { gql } from 'graphql-tag';

export const GET_TEAMS = gql`
  query GetTeams {
    getTeams {
      id
      name
    }
  }
`;

export const GET_TEAMS_BY_COMPANY_ID = gql`
  query GetTeamsByCompanyId($companyId: String!) {
    getTeamsByCompanyId(companyId: $companyId) {
      id
      name
    }
  }
`;
