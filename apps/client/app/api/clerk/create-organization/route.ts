import { graphqlClient } from '@/lib/graphql/apollo-client';
import { CREATE_COMPANY } from '@/lib/graphql/company/mutations';
import { UPDATE_USER } from '@/lib/graphql/user/mutations';
import { ClerkOrganizationCreated } from '@/types/clerk/organization-created';

/**
 * Maneja el webhook de creación de organizaciones de Clerk
 *
 * Esta función se ejecuta cuando se crea una nueva organización a través de Clerk.
 * El flujo es:
 * 1. Recibe los datos de la organización creada en Clerk
 * 2. Crea la compañía en nuestra base de datos
 * 3. Actualiza el usuario con la nueva organización
 * 4. Retorna respuesta de éxito
 */
export async function POST(request: Request) {
  const payload = await request.json();

  // Convertimos el payload a un objeto ClerkOrganizationCreated
  const organizationCreated = payload as unknown as ClerkOrganizationCreated;
  console.log('Organization created:', JSON.stringify(organizationCreated, null, 2));

  // Creamos la compañía en nuestra base de datos
  const createCompanyVariables = {
    input: {
      name: organizationCreated.data.name,
      clerkId: organizationCreated.data.id,
      subdomain: `${organizationCreated.data.slug}.localhost`,
    },
  };

  const { data: companyData } = await graphqlClient.mutate({
    mutation: CREATE_COMPANY,
    variables: createCompanyVariables,
  });

  if (!companyData.createCompany) {
    return Response.json({ message: 'Company creation failed!' }, { status: 500 });
  }

  // Actualizamos el usuario con la nueva organización
  const updateUserVariables = {
    clerkUserId: organizationCreated.data.created_by,
    clerkCompanyId: organizationCreated.data.id,
  };

  const { data: userData } = await graphqlClient.mutate({
    mutation: UPDATE_USER,
    variables: updateUserVariables,
  });

  if (!userData.updateUserOrganization) {
    return Response.json({ message: 'User organization update failed!' }, { status: 500 });
  }

  return Response.json({ message: 'Organization created and user updated successfully!' }, { status: 200 });
}
