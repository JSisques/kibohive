import { gql } from '@apollo/client';

export const getCompanies = gql`
  query GetCompanies {
    getCompanies {
      id
      name
    }
  }
`;

export const getCompanyBySubdomain = gql`
  query GetCompanyBySubdomain($subdomain: String!) {
    getCompanyBySubdomain(subdomain: $subdomain) {
      id
      name
      subdomain
      teams {
        id
        name
      }
    }
  }
`;
