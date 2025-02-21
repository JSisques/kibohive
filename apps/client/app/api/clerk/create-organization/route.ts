import { graphqlClient } from '@/lib/graphql/apollo-client';
import { CREATE_COMPANY } from '@/lib/graphql/company/mutations';
import { ClerkOrganizationCreated } from '@/types/clerk/organization-created';

/**
 * Maneja el webhook de creación de organizaciones de Clerk
 *
 * Esta función se ejecuta cuando se crea una nueva organización a través de Clerk.
 * Recibe los datos de la organización creada en Clerk y los utiliza para crear una nueva
 * compañía en nuestra base de datos a través de una mutación GraphQL.
 *
 * @param request - Objeto Request que contiene los datos de la organización creada en Clerk
 * @returns Response con mensaje de éxito o error
 *
 * El flujo es:
 * 1. Extrae el payload del request
 * 2. Convierte el payload al tipo ClerkOrganizationCreated
 * 3. Extrae los datos relevantes (nombre, slug, id) de la organización
 * 4. Ejecuta mutación GraphQL para crear la compañía en nuestra BD
 * 5. Retorna respuesta de éxito o error según el resultado
 */
export async function POST(request: Request) {
  const payload = await request.json();

  // Convertimos el payload a un objeto ClerkUserCreated
  const organizationCreated = payload as unknown as ClerkOrganizationCreated;
  console.log(JSON.stringify(organizationCreated, null, 2));

  const variables = {
    input: {
      name: organizationCreated.data.name,
      subdomain: `${organizationCreated.data.slug}.localhost`,
      clerkId: organizationCreated.data.id,
    },
  };

  const { data } = await graphqlClient.mutate({
    mutation: CREATE_COMPANY,
    variables,
  });

  if (!data.createCompany) {
    return Response.json({ message: 'Organization creation failed!' }, { status: 500 });
  }

  return Response.json({ message: 'Organization created successfully!' }, { status: 200 });
}
