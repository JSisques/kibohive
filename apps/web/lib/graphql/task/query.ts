import { gql } from '@apollo/client';

export const GET_TASKS_BY_TEAM_ID = gql`
  query GetTasksByTeamId($teamId: String!) {
    getTasksByTeamId(teamId: $teamId) {
      id
      title
      description
      dueDate
      createdById
      createdBy {
        id
        name
        email
        avatar
      }
      teamId
    }
  }
`;
