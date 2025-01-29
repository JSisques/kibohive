import { getTeamsByCompany } from '../auth/mutations';

export const getTeams = `
  query GetTeams {
    getTeams {
      id
      name
    }
  }
`;
getTeamsByCompany;
