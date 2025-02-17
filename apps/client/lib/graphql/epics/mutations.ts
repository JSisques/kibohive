import { gql } from '@apollo/client';

export const CREATE_EPIC = gql`
  mutation CreateEpic($input: CreateEpicInput!, $autoAssign: Boolean!, $useAI: Boolean!) {
    createEpic(input: $input, autoAssign: $autoAssign, useAI: $useAI) {
      id
    }
  }
`;

export const UPDATE_EPIC = gql`
  mutation UpdateEpic($id: String!, $input: UpdateEpicInput!) {
    updateEpic(id: $id, input: $input) {
      id
    }
  }
`;

export const DELETE_EPIC = gql`
  mutation DeleteEpic($id: String!) {
    deleteEpic(id: $id) {
      id
    }
  }
`;
