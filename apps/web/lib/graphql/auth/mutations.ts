import { gql } from '@apollo/client';

export const signUp = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      name
      email
      companyId
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
