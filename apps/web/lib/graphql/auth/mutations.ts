import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      user {
        id
        email
        name
        companyId
      }
      companySubdomain
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        email
        name
        companyId
      }
      companySubdomain
      accessToken
    }
  }
`;

export const checkSubdomain = gql`
  query IsSubdomainAvailable($subdomain: String!) {
    isSubdomainAvailable(subdomain: $subdomain)
  }
`;

export const createCompany = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      name
      subdomain
      createdAt
    }
  }
`;

export const getTeamsByCompany = gql`
  query GetTeamsByCompany($subdomain: String!) {
    getTeamsByCompany(subdomain: $subdomain) {
      id
      name
      description
    }
  }
`;

export const createTeam = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      description
    }
  }
`;
