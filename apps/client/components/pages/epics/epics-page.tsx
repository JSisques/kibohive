'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import EpicModal from '@/components/organisms/epicModal/epic-modal';
import { GET_EPICS } from '@/lib/graphql/epics/queries';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_BY_CLERK_ID } from '@/lib/graphql';
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
  const { data, loading, error } = useQuery(GET_EPICS);

  useEffect(() => {
    if (data) {
      setEpics(data.getEpics);
    }
  }, [data]);

  const handleCreateEpic = (data: { title: string; description: string }) => {
    // Aquí implementaremos la lógica para crear una nueva épica
    const newEpic: Epic = {
      id: (epics.length + 1).toString(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEpics(prevEpics => [...prevEpics, newEpic]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">Épicas</h1>
        <EpicModal companyId={companyData?.getCompanyByClerkId.id} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {epics.map(epic => (
            <div key={epic.id} className="p-6 bg-background hover:bg-muted/50 border border-border rounded-lg transition-colors cursor-pointer">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{epic.title}</h3>
                  <time className="text-sm text-muted-foreground">{new Date(epic.updatedAt).toLocaleDateString()}</time>
                </div>
                <p className="text-sm text-muted-foreground">{epic.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EpicsPage;
