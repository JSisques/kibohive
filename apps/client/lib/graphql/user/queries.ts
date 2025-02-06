import { gql } from '@apollo/client';

export const GET_USER_SKILLS = gql`
  query GetUserSkills($userId: String!) {
    getUserSkills(userId: $userId) {
      id
      name
      rating
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_CLERK_ID = gql`
  query GetUserByClerkId($clerkId: String!) {
    getUserByClerkId(clerkId: $clerkId) {
      id
      name
      email
      skills {
        id
        name
        rating
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_PUBLIC_INFO = gql`
  query GetUserPublicInfo($id: String!) {
    getUserById(id: $id) {
      id
      name
      email
      skills {
        id
        name
        rating
      }
      tasks {
        id
        title
        status
        assignmentReason
      }
    }
  }
`;

export const GET_COMPANY_MEMBERS = gql`
  query GetCompanyMembers {
    getUsers {
      id
      name
      email
      createdAt
    }
  }
`;
