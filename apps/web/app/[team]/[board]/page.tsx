'use client';

import { Button } from '@/components/ui/button';
import { Kanban } from '@/components/organisms/kanban';
import { Timeline } from '@/components/organisms/timeline';
import { useParams } from 'next/navigation';
import { CalendarDays, KanbanSquare, LayoutList, GanttChart } from 'lucide-react';
import React, { useState } from 'react';
import TaskTable from '@/components/organisms/task-table';
import { Calendar } from '@/components/organisms/calendar';
import { Separator } from '@/components/ui/separator';

type ViewType = 'kanban' | 'table' | 'calendar' | 'timeline';

const BoardPage = () => {
  const { team } = useParams();
  const [currentView, setCurrentView] = useState<ViewType>('kanban');

  const views = [
    { id: 'kanban', label: 'Kanban', icon: <KanbanSquare className="w-4 h-4" /> },
    { id: 'table', label: 'Tabla', icon: <LayoutList className="w-4 h-4" /> },
    { id: 'calendar', label: 'Calendario', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <GanttChart className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">📄 Lista de tareas</h1>
      <p className="text-gray-600 mb-4">Usa esta plantilla para llevar un seguimiento de tus tareas pendientes.</p>
      <div className="text-sm text-gray-500 mb-6">
        Mueve las tarjetas de tareas pendientes a la siguiente sección a medida que las completes o haz clic en el botón ¡Completado!
      </div>

      {/* View Selector */}
      <div className="flex items-center space-x-2 mb-4">
        {views.map(view => (
          <Button
            key={view.id}
            variant={currentView === view.id ? 'default' : 'ghost'}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setCurrentView(view.id as ViewType)}
          >
            {view.icon}
            {view.label}
          </Button>
        ))}
      </div>

      <Separator />

      {/* Content */}
      <div className="flex-1 mt-6">
        {currentView === 'kanban' && <Kanban />}
        {currentView === 'table' && <TaskTable />}
        {currentView === 'timeline' && <Timeline />}
        {currentView === 'calendar' && <Calendar />}
      </div>
    </div>
  );
};

export default BoardPage;
