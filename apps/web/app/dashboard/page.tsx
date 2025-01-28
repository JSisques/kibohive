import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard - KiboHive',
  description: 'Gestiona tus proyectos con KiboHive',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Bienvenido, {session?.user?.name}</h1>
      <p className="text-muted-foreground">Esta es tu página de dashboard. Aquí podrás gestionar tus proyectos y equipos.</p>
    </div>
  );
}
