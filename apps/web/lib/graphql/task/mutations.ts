import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      createdAt
      companyId
      teamId
      epicId
      assignedToId
      createdById
    }
  }
`;
