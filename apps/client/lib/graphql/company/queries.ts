import { gql } from '@apollo/client';

export const GET_COMPANY = gql`
  query GetCompany {
    getCompany {
      id
      name
      subdomain
      clerkId
    }
  }
`;

export const GET_COMPANY_BY_SUBDOMAIN = gql`
  query GetCompanyBySubdomain($subdomain: String!) {
    getCompanyBySubdomain(subdomain: $subdomain) {
      id
    }
  }
`;

export const GET_COMPANY_BY_CLERK_ID = gql`
  query GetCompanyByClerkId($clerkId: String!) {
    getCompanyByClerkId(clerkId: $clerkId) {
      id
    }
  }
`;
