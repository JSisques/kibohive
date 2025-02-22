import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($clerkUserId: String!, $clerkCompanyId: String!) {
    updateUserOrganization(clerkUserId: $clerkUserId, clerkCompanyId: $clerkCompanyId) {
      id
    }
  }
`;

export const UPDATE_USER_SKILL = gql`
  mutation UpdateUserSkill($userId: String!, $skillId: String!, $skill: UpdateUserSkillInput!) {
    updateUserSkill(userId: $userId, skillId: $skillId, skill: $skill) {
      id
      name
      rating
    }
  }
`;

export const ADD_USER_SKILL = gql`
  mutation AddUserSkill($userId: String!, $skill: CreateUserSkillInput!) {
    addUserSkill(userId: $userId, skill: $skill) {
      id
      name
      rating
    }
  }
`;

export const DELETE_USER_SKILL = gql`
  mutation DeleteUserSkill($userId: String!, $skillId: String!) {
    deleteUserSkill(userId: $userId, skillId: $skillId) {
      id
    }
  }
`;
