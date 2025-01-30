'use client';

import { useEffect } from 'react';
import { useCompany } from '@/context/company-context';
import { useSession } from 'next-auth/react';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_COMPANY_BY_SUBDOMAIN } from '@/lib/graphql/company/query';
import { useTeam } from '@/context/team-context';

export function CompanyInitializer() {
  const { data: session } = useSession();
  const { setCurrentCompany } = useCompany();
  const { setCurrentTeam } = useTeam();

  useEffect(() => {
    const initialize = async () => {
      if (session?.user?.companySubdomain) {
        try {
          const { data: companyData } = await graphqlClient.query({
            query: GET_COMPANY_BY_SUBDOMAIN,
            variables: { subdomain: session.user.companySubdomain },
          });

          if (companyData?.getCompanyBySubdomain) {
            setCurrentCompany(companyData.getCompanyBySubdomain);
          }

          if (companyData?.getCompanyBySubdomain?.teams) {
            setCurrentTeam(companyData.getCompanyBySubdomain.teams[0]);
          }
        } catch (error) {
          console.error('Error fetching company and team:', error);
        }
      }
    };

    initialize();
  }, [session?.user?.companySubdomain, setCurrentCompany]);

  return null; // Este componente no renderiza nada
}
