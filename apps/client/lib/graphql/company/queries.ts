import { gql } from '@apollo/client';

export const GET_COMPANY = gql`
  query GetCompany {
    getCompany {
      id
      name
      subdomain
      clerkId
      businessRules
      members {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_COMPANY_BY_SUBDOMAIN = gql`
  query GetCompanyBySubdomain($subdomain: String!) {
    getCompanyBySubdomain(subdomain: $subdomain) {
      id
      name
      subdomain
      businessRules
    }
  }
`;

export const GET_COMPANY_BY_CLERK_ID = gql`
  query GetCompanyByClerkId($clerkId: String!) {
    getCompanyByClerkId(clerkId: $clerkId) {
      id
      name
      subdomain
      businessRules
      epics {
        id
        title
        description
        tasks {
          id
          title
          status
        }
        numberOfTasks
        numberOfTaskCompleted
        tasksCompleted {
          id
          title
          status
        }
        numberOfTaskInProgress
        tasksInProgress {
          id
          title
          status
        }
        numberOfTaskPending
        tasksPending {
          id
          title
          status
        }
      }
      members {
        id
        name
        email
        skills {
          id
          name
          rating
        }
      }
    }
  }
`;
