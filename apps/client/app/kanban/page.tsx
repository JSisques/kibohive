import { Kanban } from '@/components/organisms/kanban/kanban';
import React from 'react';

const KanbanPage = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Kanban</h1>
        <p className="text-sm text-muted-foreground">Gestiona tus tareas en un tablero visual y colaborativo.</p>
        <Kanban />
      </div>
    </div>
  );
};

export default KanbanPage;
