'use client';

import { useEffect } from 'react';
import { useCompany } from '@/context/company-context';
import { useSession } from 'next-auth/react';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_COMPANY_BY_SUBDOMAIN } from '@/lib/graphql/company/query';

export function CompanyInitializer() {
  const { data: session } = useSession();
  const { setCurrentCompany } = useCompany();

  useEffect(() => {
    const initializeCompany = async () => {
      if (session?.user?.companySubdomain) {
        try {
          const { data } = await graphqlClient.query({
            query: GET_COMPANY_BY_SUBDOMAIN,
            variables: { subdomain: session.user.companySubdomain },
          });

          if (data?.getCompanyBySubdomain) {
            setCurrentCompany(data.getCompanyBySubdomain);
          }
        } catch (error) {
          console.error('Error fetching company:', error);
        }
      }
    };

    initializeCompany();
  }, [session?.user?.companySubdomain, setCurrentCompany]);

  return null; // Este componente no renderiza nada
}
