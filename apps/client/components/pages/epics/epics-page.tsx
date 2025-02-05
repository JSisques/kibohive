'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import EpicModal from '@/components/organisms/epicModal/epic-modal';
import { GET_EPICS } from '@/lib/graphql/epics/queries';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_BY_CLERK_ID } from '@/lib/graphql';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface Epic {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const EpicsPage = () => {
  const { data: companyData, loading: companyLoading } = useQuery(GET_COMPANY_BY_CLERK_ID);
  const [epics, setEpics] = useState<Epic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useQuery(GET_EPICS);

  useEffect(() => {
    if (data) {
      setEpics(data.getEpics);
    }
  }, [data]);

  const filteredEpics = epics.filter(
    epic => epic.title.toLowerCase().includes(searchTerm.toLowerCase()) || epic.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (error)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive">Error al cargar las épicas</h3>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Épicas</h1>
          <p className="text-sm text-muted-foreground">Gestiona y organiza las épicas de tu empresa</p>
        </div>
        <EpicModal companyId={companyData?.getCompanyByClerkId.id} />
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar épicas por título o descripción..."
          className="pl-10"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-[200px]">
              <CardHeader className="pb-4">
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEpics.map(epic => (
              <Card key={epic.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{epic.title}</h3>
                    <Badge variant="secondary">{new Date(epic.updatedAt).toLocaleDateString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{epic.description}</p>
                </CardContent>
                <CardFooter className="pt-4">
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>Creada: {new Date(epic.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredEpics.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No se encontraron épicas</h3>
              <p className="text-sm text-muted-foreground">Intenta con otros términos de búsqueda</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EpicsPage;
