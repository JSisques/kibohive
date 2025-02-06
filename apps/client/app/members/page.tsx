'use client';

import { useQuery } from '@apollo/client';
import { GET_COMPANY_MEMBERS } from '@/lib/graphql/user/queries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail } from 'lucide-react';

const MembersPage = () => {
  const { data, loading, error } = useQuery(GET_COMPANY_MEMBERS);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Miembros del Equipo</h1>
        <p className="text-muted-foreground">Gestiona y visualiza la información de los miembros del equipo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.getUsers.map((member: any) => (
          <Link key={member.id} href={`/members/${member.id}`}>
            <Card className="hover:shadow-md transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{member.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Miembro desde</span>
                  <span>{format(new Date(member.createdAt), 'PP', { locale: es })}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
