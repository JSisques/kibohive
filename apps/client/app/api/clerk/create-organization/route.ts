import { graphqlClient } from '@/lib/graphql/apollo-client';
import { CREATE_COMPANY } from '@/lib/graphql/company/mutations';
import { CREATE_USER } from '@/lib/graphql/user/mutations';
import { ClerkUserCreated } from '@/types';
import { ClerkOrganizationCreated } from '@/types/clerk/organization-created';

/**
 * Maneja el webhook de registro de usuarios de Clerk
 *
 * Esta función se ejecuta cuando un nuevo usuario se registra a través de Clerk.
 * Recibe los datos del usuario creado en Clerk y los utiliza para crear un nuevo
 * usuario en nuestra base de datos a través de una mutación GraphQL.
 *
 * @param request - Objeto Request que contiene los datos del usuario creado en Clerk
 * @returns Response con mensaje de éxito
 *
 * El flujo es:
 * 1. Extrae el payload del request
 * 2. Convierte el payload al tipo ClerkUserCreated
 * 3. Extrae los datos relevantes (email, id, nombre) del usuario
 * 4. Ejecuta mutación GraphQL para crear el usuario en nuestra BD
 * 5. Retorna respuesta de éxito
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
