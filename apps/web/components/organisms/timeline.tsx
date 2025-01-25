'use client';

import React, { useState } from 'react';
import { addMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: string;
  description: string;
  assignee: string;
};

const COLORS = {
  'por-hacer': 'bg-yellow-100 border-yellow-400 text-yellow-700',
  'en-progreso': 'bg-blue-100 border-blue-400 text-blue-700',
  completado: 'bg-emerald-100 border-emerald-400 text-emerald-700',
};

export const Timeline = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [zoom, setZoom] = useState<'quarters' | 'months'>('months');

  // Datos de ejemplo - esto debería venir de una API o props
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Añadir sistema de login y registro',
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2025, 2, 15),
      status: 'en-progreso',
      assignee: 'Juan',
    },
    {
      id: '2',
      title: 'Diseñar UI/UX',
      description: 'Crear diseños en Figma',
      startDate: new Date(2024, 1, 1),
      endDate: new Date(2025, 3, 30),
      status: 'por-hacer',
      assignee: 'María',
    },
    {
      id: '3',
      title: 'Testing E2E',
      description: 'Implementar pruebas end-to-end',
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2025, 4, 15),
      status: 'completado',
      assignee: 'Carlos',
    },
  ];

  const months = Array.from({ length: 6 }, (_, i) => addMonths(startOfMonth(currentDate), i));

  const handlePrevMonth = () => setCurrentDate(prev => addMonths(prev, -1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  const calculateTaskPosition = (task: Task) => {
    const startMonth = startOfMonth(currentDate);
    const totalDays = differenceInDays(endOfMonth(addMonths(startMonth, 5)), startMonth);

    // Asegurarnos de que las fechas de la tarea estén dentro del rango visible
    const visibleStartDate = task.startDate < startMonth ? startMonth : task.startDate;
    const visibleEndDate = task.endDate > endOfMonth(addMonths(startMonth, 5)) ? endOfMonth(addMonths(startMonth, 5)) : task.endDate;

    const taskStart = Math.max(0, differenceInDays(visibleStartDate, startMonth));
    const taskDuration = differenceInDays(visibleEndDate, visibleStartDate);

    const left = Math.max(0, (taskStart / totalDays) * 100);
    const width = Math.min(100 - left, (taskDuration / totalDays) * 100);

    return {
      left: `${left}%`,
      width: `${Math.max(width, 0)}%`,
    };
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px] bg-background rounded-lg border">
        {/* Header con controles */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="font-medium text-foreground">{format(currentDate, 'MMMM yyyy', { locale: es })}</span>
          </div>
          <Button size="sm" variant="default">
            <Plus className="h-4 w-4 mr-2" />
            Nueva tarea
          </Button>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Months header */}
          <div className="flex border-b">
            <div className="w-48 p-4 border-r bg-muted font-medium text-muted-foreground">Tareas</div>
            <div className="flex-1 flex">
              {months.map((month, i) => (
                <div key={i} className="flex-1 p-2 text-center border-r font-medium text-muted-foreground relative">
                  {format(month, 'MMMM', { locale: es })}
                  {/* Líneas de división de meses */}
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-border" />
                </div>
              ))}
            </div>
          </div>

          {/* Tasks rows */}
          <div className="relative">
            {tasks.map(task => (
              <div key={task.id} className="flex border-b group hover:bg-muted/50 transition-colors">
                <div className="w-48 p-4 border-r bg-muted/50">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">Asignado a: {task.assignee}</div>
                </div>
                <div className="flex-1 relative h-20">
                  {/* Task bar */}
                  <div
                    className={cn(
                      'absolute h-12 my-4 rounded-md border shadow-sm',
                      COLORS[task.status as keyof typeof COLORS],
                      'cursor-pointer transition-all hover:shadow-md group-hover:translate-y-[-2px]',
                    )}
                    style={calculateTaskPosition(task)}
                  >
                    <div className="px-3 py-1">
                      <div className="text-sm font-medium truncate">{task.title}</div>
                      <div className="text-xs truncate">{task.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Today marker */}
          <div
            className="absolute top-0 bottom-0 w-px bg-primary"
            style={{
              left: `${(differenceInDays(new Date(), startOfMonth(currentDate)) / (30 * 6)) * 100}%`,
            }}
          >
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs absolute -top-6 left-1/2 transform -translate-x-1/2">
              Hoy
            </div>
          </div>

          {/* Grid lines for months */}
          <div className="absolute inset-0 flex pointer-events-none">
            {months.map((_, i) => (
              <div key={i} className="flex-1 border-r border-border/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
