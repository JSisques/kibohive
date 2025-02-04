import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      id
      title
      description
      createdAt
      updatedAt
      epicId
      epic {
        id
        title
        description
      }
      assignedTo {
        id
        name
        email
      }
    }
  }
`;
