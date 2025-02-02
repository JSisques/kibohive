'use client';

import { CreateOrganization } from '@clerk/nextjs';
import { useMutation } from '@apollo/client';
import { CREATE_COMPANY } from '@/lib/graphql/company/mutations';
import React from 'react';

const CreateOrganizationPage = () => {
  const [createCompany] = useMutation(CREATE_COMPANY);

  const handleCreateOrganization = async (organization: any) => {
    try {
      const response = await createCompany({
        variables: {
          input: {
            name: organization.name,
            subdomain: organization.slug || organization.name.toLowerCase().replace(/\s+/g, '-'),
            clerkId: organization.id,
          },
        },
      });

      // Aquí puedes manejar la respuesta exitosa
      console.log('Compañía creada:', response.data);
    } catch (error) {
      console.error('Error al crear la compañía:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <CreateOrganization
        afterCreateOrganizationUrl="/"
        appearance={{
          elements: {
            card: 'w-full max-w-md',
          },
        }}
      />
    </div>
  );
};

export default CreateOrganizationPage;
