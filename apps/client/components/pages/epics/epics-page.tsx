'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import EpicModal from '@/components/organisms/epicModal/epic-modal';

interface Epic {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const EpicsPage = () => {
  const [epics, setEpics] = React.useState<Epic[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false);
      setEpics([
        {
          id: '1',
          title: 'Desarrollo de Nueva Funcionalidad',
          description: 'Implementación de nuevas características para el Q1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Más épicas de ejemplo...
      ]);
    }, 1000);
  }, []);

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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium">Épicas</h1>
        <EpicModal onSubmit={handleCreateEpic} />
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
