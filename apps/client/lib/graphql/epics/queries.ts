import { gql } from '@apollo/client';

export const GET_EPICS = gql`
  query GetEpics {
    getEpics {
      id
      title
      description
      createdAt
    }
  }
`;

export const GET_EPIC_BY_ID = gql`
  query GetEpicById($id: String!) {
    getEpicById(id: $id) {
      id
    }
  }
`;
