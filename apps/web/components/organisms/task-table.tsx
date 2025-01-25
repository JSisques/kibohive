'use client';

import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '../ui/table';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown, Search, Edit2, Check, X } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  epic: string;
  tags: string[];
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
];

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title:
      'Implementar autenticación Implementar autenticaciónImplementar autenticaciónImplementar autenticaciónImplementar autenticaciónImplementar autenticaciónImplementar autenticaciónImplementar autenticaciónImplementar autenticación',
    description: 'Añadir sistema de login y registro',
    status: 'en-progreso',
    assignee: '1',
    epic: 'Auth',
    tags: ['frontend', 'auth'],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    title: 'Diseñar UI/UX',
    description: 'Crear diseños en Figma',
    status: 'por-hacer',
    assignee: '2',
    epic: 'Diseño',
    tags: ['diseño', 'ui'],
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    title: 'Testing E2E',
    description: 'Implementar pruebas end-to-end',
    status: 'completado',
    assignee: '3',
    epic: 'Testing',
    tags: ['testing', 'qa'],
    createdAt: '2024-01-03',
  },
];

const STATUS_COLORS = {
  'por-hacer': 'bg-yellow-100 text-yellow-800',
  'en-progreso': 'bg-blue-100 text-blue-800',
  completado: 'bg-green-100 text-green-800',
};

// Modificar los estilos de las celdas y los filtros
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('p-4 align-top [&:has([role=checkbox])]:pr-0', className)} {...props} />
));
TableCell.displayName = 'TableCell';

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    epic: '',
  });
  const [editingCell, setEditingCell] = useState<{
    taskId: string;
    field: keyof Task;
  } | null>(null);
  const [editValue, setEditValue] = useState('');

  // Obtener valores únicos para los filtros
  const uniqueStatuses = Array.from(new Set(tasks.map(task => task.status)));
  const uniqueEpics = Array.from(new Set(tasks.map(task => task.epic)));

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = Object.values(task).some(value => value.toString().toLowerCase().includes(filters.search.toLowerCase()));
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesEpic = !filters.epic || task.epic === filters.epic;
    return matchesSearch && matchesStatus && matchesEpic;
  });

  const handleEdit = (taskId: string, field: keyof Task) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditValue(task[field].toString());
      setEditingCell({ taskId, field });
    }
  };

  const handleSave = () => {
    if (!editingCell) return;

    setTasks(prev => prev.map(task => (task.id === editingCell.taskId ? { ...task, [editingCell.field]: editValue } : task)));
    setEditingCell(null);
    setEditValue('');
  };

  const renderCell = (task: Task, field: keyof Task) => {
    const isEditing = editingCell?.taskId === task.id && editingCell?.field === field;

    if (isEditing) {
      if (field === 'assignee') {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full h-8">
                Seleccionar usuario
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {MOCK_USERS.map(user => (
                <DropdownMenuItem
                  key={user.id}
                  onClick={() => {
                    setEditValue(user.id);
                    handleSave();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user.name}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      return (
        <div className="flex items-center gap-1">
          <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="h-8" autoFocus />
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setEditingCell(null)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    if (field === 'status') {
      return <Badge className={STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]}>{task.status}</Badge>;
    }

    if (field === 'tags') {
      return (
        <div className="flex gap-1 flex-wrap">
          {task.tags.map(tag => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      );
    }

    if (field === 'assignee') {
      const user = MOCK_USERS.find(u => u.id === task[field]);
      if (!user) return null;

      return (
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </div>
          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0" onClick={() => handleEdit(task.id, field)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    // Renderizado especial para el título y descripción
    if (field === 'title' || field === 'description') {
      return (
        <div className="flex items-start justify-between group min-h-[2rem]">
          <span className="whitespace-pre-wrap break-words max-w-[300px]">{task[field]}</span>
          <Button
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0 ml-2 flex-shrink-0"
            onClick={() => handleEdit(task.id, field)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between group">
        <span>{task[field]}</span>
        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0" onClick={() => handleEdit(task.id, field)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={filters.search}
            onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="pl-8"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] max-w-[200px] truncate">
              <span className="truncate">Estado {filters.status && `(${filters.status})`}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, status: '' }))}>Todos</DropdownMenuItem>
            {uniqueStatuses.map(status => (
              <DropdownMenuItem key={status} onClick={() => setFilters(prev => ({ ...prev, status }))}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] max-w-[200px] truncate">
              <span className="truncate">Epic {filters.epic && `(${filters.epic})`}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, epic: '' }))}>Todos</DropdownMenuItem>
            {uniqueEpics.map(epic => (
              <DropdownMenuItem key={epic} onClick={() => setFilters(prev => ({ ...prev, epic }))}>
                {epic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Tarea</TableHead>
              <TableHead className="w-[300px]">Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Epic</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Fecha creación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(task => (
              <TableRow key={task.id} className="align-top">
                <TableCell>{renderCell(task, 'title')}</TableCell>
                <TableCell>{renderCell(task, 'description')}</TableCell>
                <TableCell>{renderCell(task, 'status')}</TableCell>
                <TableCell>{renderCell(task, 'assignee')}</TableCell>
                <TableCell>{renderCell(task, 'epic')}</TableCell>
                <TableCell>{renderCell(task, 'tags')}</TableCell>
                <TableCell>{renderCell(task, 'createdAt')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;
