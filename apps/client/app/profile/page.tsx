'use client';
import { useUser } from '@clerk/nextjs';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Mail, Building2, Shield, Lock, Lightbulb } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_CLERK_ID } from '@/lib/graphql/user/queries';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, isLoaded } = useUser();

  const { data: userData, loading: userLoading } = useQuery(GET_USER_BY_CLERK_ID, {
    variables: {
      clerkId: user?.id,
    },
    skip: !user?.id,
  });

  if (!isLoaded || userLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Encabezado del perfil */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Personal */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            <CardTitle>Información Personal</CardTitle>
          </div>
          <CardDescription>Gestiona tu información personal y cómo te ven otros usuarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" defaultValue={user?.firstName || ''} placeholder="Tu nombre" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellidos</Label>
              <Input id="lastName" defaultValue={user?.lastName || ''} placeholder="Tus apellidos" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.primaryEmailAddress?.emailAddress} disabled />
          </div>
          <Button className="w-full md:w-auto">Guardar Cambios</Button>
        </CardContent>
      </Card>

      {/* Seguridad */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Seguridad</CardTitle>
          </div>
          <CardDescription>Gestiona la configuración de seguridad de tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Autenticación de dos factores</h4>
              <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
            </div>
            <Button variant="outline">Configurar 2FA</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">Sesiones activas</h4>
              <p className="text-sm text-muted-foreground">Gestiona tus sesiones activas en diferentes dispositivos</p>
            </div>
            <Button variant="outline">Ver sesiones</Button>
          </div>
        </CardContent>
      </Card>

      {/* Organización */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <CardTitle>Organización</CardTitle>
          </div>
          <CardDescription>Información sobre tu organización y rol</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Organización actual</Label>
              <div className="text-sm rounded-lg bg-secondary p-3">{user?.organizationMemberships?.[0]?.organization.name || 'Sin organización'}</div>
            </div>
            <div className="space-y-2">
              <Label>Rol en la organización</Label>
              <div className="text-sm rounded-lg bg-secondary p-3">{user?.organizationMemberships?.[0]?.role || 'Sin rol asignado'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            <CardTitle>Mis Habilidades</CardTitle>
          </div>
          <CardDescription>Tus habilidades y niveles de competencia actuales</CardDescription>
        </CardHeader>
        <CardContent>
          {userLoading ? (
            <div>Cargando habilidades...</div>
          ) : userData?.getUserByClerkId?.skills?.length > 0 ? (
            <div className="space-y-4">
              {userData.getUserByClerkId.skills.map((skill: any) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{skill.name}</Label>
                    <Badge variant="secondary">{skill.rating}/5</Badge>
                  </div>
                  <Progress value={(skill.rating / 5) * 100} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No tienes habilidades registradas aún. Un administrador puede añadirlas desde tu perfil público.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
