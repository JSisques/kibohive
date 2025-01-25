'use client';

import React, { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
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

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Datos de ejemplo - esto debería venir de una API o props
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Añadir sistema de login y registro',
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2025, 1, 15),
      status: 'en-progreso',
      assignee: 'Juan',
    },
    {
      id: '2',
      title: 'Diseñar UI/UX',
      description: 'Crear diseños en Figma',
      startDate: new Date(2025, 1, 5),
      endDate: new Date(2025, 1, 10),
      status: 'por-hacer',
      assignee: 'María',
    },
    {
      id: '3',
      title: 'Testing E2E',
      description: 'Implementar pruebas end-to-end',
      startDate: new Date(2025, 1, 15),
      endDate: new Date(2025, 1, 20),
      status: 'completado',
      assignee: 'Carlos',
    },
  ];

  const handlePrevMonth = () => setCurrentDate(prev => addMonths(prev, -1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  // Obtener todos los días del mes actual
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Obtener las tareas que tienen deadline en un día específico
  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.endDate), date));
  };

  // Obtener las tareas que empiezan en un día específico
  const getStartingTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.startDate), date));
  };

  return (
    <div className="w-full bg-background rounded-lg border">
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

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map(day => (
            <div key={day} className="text-sm font-medium text-muted-foreground text-center py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, dayIdx) => {
            const deadlineTasks = getTasksForDay(day);
            const startingTasks = getStartingTasksForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toString()}
                className={cn(
                  'min-h-[120px] p-2 border rounded-lg',
                  isCurrentMonth ? 'bg-background' : 'bg-muted/30',
                  isToday(day) && 'border-primary',
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={cn('text-sm', !isCurrentMonth && 'text-muted-foreground', isToday(day) && 'text-primary font-bold')}>
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="space-y-1">
                  {/* Tareas que empiezan este día */}
                  {startingTasks.map(task => (
                    <div
                      key={`start-${task.id}`}
                      className={cn(
                        'text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 flex items-center gap-1',
                        COLORS[task.status as keyof typeof COLORS],
                      )}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />
                      {task.title}
                    </div>
                  ))}
                  {/* Deadlines */}
                  {deadlineTasks.map(task => (
                    <div
                      key={`deadline-${task.id}`}
                      className={cn(
                        'text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 flex items-center gap-1',
                        COLORS[task.status as keyof typeof COLORS],
                      )}
                    >
                      <Clock className="w-3 h-3" />
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
