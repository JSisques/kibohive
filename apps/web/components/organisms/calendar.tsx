'use client';

import React, { useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Task = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: string;
  description: string;
  assignee: string;
  epic: string;
};

const COLORS = {
  'por-hacer': 'bg-yellow-100 border-yellow-400 text-yellow-700',
  'en-progreso': 'bg-blue-100 border-blue-400 text-blue-700',
  completado: 'bg-emerald-100 border-emerald-400 text-emerald-700',
};

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const MOCK_USERS = [
  { id: '1', name: 'Juan' },
  { id: '2', name: 'María' },
  { id: '3', name: 'Carlos' },
];

const MOCK_EPICS = ['Auth', 'Diseño', 'Testing', 'Documentación'];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'por-hacer',
    assignee: '',
    epic: '',
  });
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implementar autenticación',
      description: 'Añadir sistema de login y registro',
      startDate: new Date(2025, 1, 1),
      endDate: new Date(2025, 1, 15),
      status: 'en-progreso',
      assignee: 'Juan',
      epic: 'Auth',
    },
    {
      id: '2',
      title: 'Diseñar UI/UX',
      description: 'Crear diseños en Figma',
      startDate: new Date(2025, 1, 5),
      endDate: new Date(2025, 1, 10),
      status: 'por-hacer',
      assignee: 'María',
      epic: 'Diseño',
    },
    {
      id: '3',
      title: 'Testing E2E',
      description: 'Implementar pruebas end-to-end',
      startDate: new Date(2025, 1, 15),
      endDate: new Date(2025, 1, 20),
      status: 'completado',
      assignee: 'Carlos',
      epic: 'Testing',
    },
  ]);

  const handlePrevMonth = () => setCurrentDate(prev => addMonths(prev, -1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

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

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setNewTask(prev => ({
      ...prev,
      startDate: date,
      endDate: date,
    }));
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.assignee || !newTask.startDate || !newTask.endDate || !newTask.epic) return;

    const task: Task = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status || 'por-hacer',
      startDate: newTask.startDate,
      endDate: newTask.endDate,
      assignee: newTask.assignee,
      epic: newTask.epic,
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'por-hacer',
      assignee: '',
      epic: '',
    });
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <div className="w-full  bg-background rounded-lg border">
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
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    'min-h-[120px] p-2 border rounded-lg cursor-pointer hover:border-primary transition-colors',
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

      {/* Modal de creación de tarea */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Tarea para {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Título de la tarea"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descripción de la tarea"
              />
            </div>
            <div className="grid gap-2">
              <Label>Asignar a</Label>
              <Select value={newTask.assignee} onValueChange={value => setNewTask(prev => ({ ...prev, assignee: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar miembro" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_USERS.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Épica</Label>
              <Select value={newTask.epic} onValueChange={value => setNewTask(prev => ({ ...prev, epic: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar épica" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_EPICS.map(epic => (
                    <SelectItem key={epic} value={epic}>
                      {epic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Fecha inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTask.startDate ? format(newTask.startDate, 'yyyy-MM-dd') : ''}
                  onChange={e => setNewTask(prev => ({ ...prev, startDate: new Date(e.target.value) }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Fecha fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newTask.endDate ? format(newTask.endDate, 'yyyy-MM-dd') : ''}
                  onChange={e => setNewTask(prev => ({ ...prev, endDate: new Date(e.target.value) }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTask}>Crear Tarea</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
