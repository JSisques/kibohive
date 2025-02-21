import { graphqlClient } from '@/lib/graphql/apollo-client';
import { CREATE_USER } from '@/lib/graphql/user/mutations';
import { ClerkUserCreated } from '@/types';

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
  const userCreated = payload as unknown as ClerkUserCreated;
  console.log(JSON.stringify(userCreated, null, 2));

  const variables = {
    input: {
      email: userCreated.data.email_addresses[0].email_address,
      clerkId: userCreated.data.id,
      name: userCreated.data.first_name,
      companyId: '461530e8-6279-45b0-be59-da009f12ee46',
    },
  };

  const { data } = await graphqlClient.mutate({
    mutation: CREATE_USER,
    variables,
  });

  if (!data.createUser) {
    return Response.json({ message: 'User creation failed!' }, { status: 500 });
  }

  return Response.json({ message: 'User created successfully!' }, { status: 200 });
}
