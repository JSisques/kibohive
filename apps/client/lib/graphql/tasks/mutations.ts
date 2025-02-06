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
