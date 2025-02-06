'use client';

import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPANY_BY_CLERK_ID } from '@/lib/graphql/company/queries';
import { UPDATE_COMPANY } from '@/lib/graphql/company/mutations';
import { useOrganization } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { Building2, BookOpen, Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  const { organization } = useOrganization();
  const [isEditing, setIsEditing] = useState(false);
  const [businessRules, setBusinessRules] = useState('');

  const { data, loading } = useQuery(GET_COMPANY_BY_CLERK_ID, {
    variables: {
      clerkId: organization?.id,
    },
    skip: !organization?.id,
    onCompleted: data => {
      setBusinessRules(data.getCompanyByClerkId.businessRules || '');
    },
  });

  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    onCompleted: () => {
      toast.success('Reglas de negocio actualizadas correctamente');
      setIsEditing(false);
    },
    onError: error => {
      toast.error(`Error al actualizar las reglas de negocio: ${error.message}`);
    },
  });

  const handleSave = async () => {
    await updateCompany({
      variables: {
        id: data.getCompanyByClerkId.id,
        input: {
          businessRules,
        },
      },
    });
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Configuración</h2>
          <p className="text-muted-foreground">Gestiona la configuración de tu organización y las reglas de negocio</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <CardTitle>Información de la Organización</CardTitle>
              </div>
            </div>
            <CardDescription>Información general sobre tu organización</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-medium">Nombre</h3>
              <p className="text-sm text-muted-foreground">{data?.getCompanyByClerkId.name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <CardTitle>Reglas de Negocio</CardTitle>
              </div>
              <Button variant="outline" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                {isEditing ? 'Guardar' : 'Editar'}
              </Button>
            </div>
            <CardDescription>Define las reglas de negocio que la IA tendrá en cuenta al generar y asignar tareas</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={businessRules}
                onChange={e => setBusinessRules(e.target.value)}
                placeholder="Describe las reglas de negocio de tu organización..."
                className="min-h-[200px]"
              />
            ) : (
              <div className="rounded-lg bg-muted p-4">
                {businessRules ? (
                  <p className="whitespace-pre-wrap text-sm">{businessRules}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No hay reglas de negocio definidas. Haz clic en "Editar" para añadir las reglas que la IA tendrá en cuenta.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
