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

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
      id
      title
      description
      status
      createdAt
      updatedAt
      assignmentReason
      epic {
        id
        title
      }
      assignedTo {
        id
        name
        email
      }
    }
  }
`;
