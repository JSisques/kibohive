import { gql } from '@apollo/client';

export const getCompanies = gql`
  query GetCompanies {
    getCompanies {
      id
      name
    }
  }
`;

export const GET_COMPANY_BY_SUBDOMAIN = gql`
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

export const GET_COMPANY_BY_ID = gql`
  query GetCompanyById($id: String!) {
    getCompanyById(id: $id) {
      id
      name
    }
  }
`;
