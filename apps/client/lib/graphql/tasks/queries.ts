import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($page: Int!, $limit: Int!) {
    getTasks(page: $page, limit: $limit) {
      id
      title
      description
      createdAt
      status
      epic {
        title
      }
      assignedTo {
        id
        name
        email
      }
    }
    tasksCount
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
