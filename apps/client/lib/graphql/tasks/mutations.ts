import { gql } from '@apollo/client';

export const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: String!, $input: UpdateTaskStatusDto!) {
    updateTaskStatus(id: $id, input: $input) {
      id
      status
    }
  }
`;

export const UPDATE_TASK_ASSIGNMENT_REASON = gql`
  mutation UpdateTaskAssignmentReason($id: String!, $reason: String!) {
    updateTask(id: $id, input: { assignmentReason: $reason }) {
      id
      assignmentReason
    }
  }
`;

export const CREATE_TASK_COMMENT = gql`
  mutation CreateTaskComment($input: CreateTaskCommentInput!) {
    createTaskComment(input: $input) {
      id
      comment
      createdAt
      updatedAt
      taskId
      userId
      user {
        id
        name
        email
      }
    }
  }
`;

export const UPDATE_TASK_COMMENT = gql`
  mutation UpdateTaskComment($id: String!, $input: UpdateTaskCommentInput!) {
    updateTaskComment(id: $id, input: $input) {
      id
      comment
      updatedAt
      user {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_TASK_COMMENT = gql`
  mutation DeleteTaskComment($id: String!) {
    deleteTaskComment(id: $id) {
      id
    }
  }
`;
