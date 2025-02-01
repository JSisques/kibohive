import { CreateOrganization } from '@clerk/nextjs';
import React from 'react';

const CreateOrganizationPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CreateOrganization />
    </div>
  );
};

export default CreateOrganizationPage;
