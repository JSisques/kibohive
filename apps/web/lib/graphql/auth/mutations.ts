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
