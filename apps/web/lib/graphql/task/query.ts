import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
    }
  }
`;

export const GET_TASK_BY_COMPANY_ID = gql`
  query GetTaskByCompanyId($companyId: String!) {
    getTaskByCompanyId(companyId: $companyId) {
      id
    }
  }
`;
