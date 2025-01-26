'use client';

import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, Check, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate: string;
  createdAt: string;
  tags: string[];
};

const MOCK_USERS = [
  {
    id: '1',
    name: 'Juan Pérez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  },
  {
    id: '2',
    name: 'María García',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: '3',
    name: 'Carlos López',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Implementar autenticación',
    description: 'Añadir sistema de login y registro con OAuth',
    status: 'en-progreso',
    priority: 'alta',
    assignee: MOCK_USERS[0],
    dueDate: '2024-03-15',
    createdAt: '2024-01-01',
    tags: ['frontend', 'auth'],
  },
  {
    id: '2',
    title: 'Diseñar nueva landing',
    description: 'Crear diseño responsive para la página principal',
    status: 'pendiente',
    priority: 'media',
    assignee: MOCK_USERS[1],
    dueDate: '2024-03-20',
    createdAt: '2024-01-02',
    tags: ['diseño', 'ui'],
  },
  {
    id: '3',
    title: 'Optimizar rendimiento',
    description: 'Mejorar tiempo de carga y optimizar consultas',
    status: 'completada',
    priority: 'baja',
    assignee: MOCK_USERS[2],
    dueDate: '2024-03-10',
    createdAt: '2024-01-03',
    tags: ['backend', 'optimización'],
  },
];

const STATUS_COLORS = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  'en-progreso': 'bg-blue-100 text-blue-800',
  completada: 'bg-green-100 text-green-800',
  cancelada: 'bg-red-100 text-red-800',
};

const PRIORITY_COLORS = {
  alta: 'bg-red-100 text-red-800',
  media: 'bg-orange-100 text-orange-800',
  baja: 'bg-green-100 text-green-800',
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'pendiente',
    priority: 'media',
    dueDate: '',
    tags: [],
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description) return;

    const task: Task = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status || 'pendiente',
      priority: newTask.priority || 'media',
      assignee: MOCK_USERS[0], // Por defecto asignamos al primer usuario
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      tags: newTask.tags || [],
    };

    setTasks(prev => [...prev, task]);
    setShowCreateDialog(false);
    setNewTask({
      title: '',
      description: '',
      status: 'pendiente',
      priority: 'media',
      dueDate: '',
      tags: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tareas</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título</label>
                <Input
                  placeholder="Título de la tarea"
                  value={newTask.title}
                  onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <Input
                  placeholder="Descripción de la tarea"
                  value={newTask.description}
                  onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prioridad</label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newTask.priority}
                    onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha límite</label>
                  <Input type="date" value={newTask.dueDate} onChange={e => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input
                  placeholder="Tags (separados por coma)"
                  value={newTask.tags?.join(', ')}
                  onChange={e => setNewTask(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))}
                />
              </div>
              <Button onClick={handleCreateTask} className="w-full" disabled={!newTask.title || !newTask.description}>
                Crear Tarea
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar tareas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Estado {statusFilter && `(${statusFilter})`}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('')}>Todos</DropdownMenuItem>
            {Object.keys(STATUS_COLORS).map(status => (
              <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Prioridad {priorityFilter && `(${priorityFilter})`}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setPriorityFilter('')}>Todas</DropdownMenuItem>
            {Object.keys(PRIORITY_COLORS).map(priority => (
              <DropdownMenuItem key={priority} onClick={() => setPriorityFilter(priority)}>
                {priority}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Tarea</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]}>{task.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS]}>{task.priority}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                      <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {task.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TasksPage;
