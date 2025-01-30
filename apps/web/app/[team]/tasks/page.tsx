'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TaskModal } from '@/components/templates/task-modal';
import { useQuery } from '@apollo/client';
import { GET_TASKS_BY_TEAM_ID } from '@/lib/graphql/task/query';
import { graphqlClient } from '@/lib/apollo-client';
import { useTeam } from '@/context/team-context';

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
  const { currentTeam } = useTeam();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Partial<Task> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const fetchTasks = async () => {
    setIsLoading(true);
    console.log('Fetching tasks for team:', currentTeam?.id);
    const { data } = await graphqlClient.query({
      query: GET_TASKS_BY_TEAM_ID,
      variables: {
        teamId: currentTeam?.id,
      },
    });
    setTasks(data.getTasksByTeamId);
    setIsLoading(false);
  };

  const handleCreateTask = (taskData: Partial<Task>) => {
    const task: Task = {
      id: (tasks.length + 1).toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      status: taskData.status || 'pendiente',
      priority: taskData.priority || 'media',
      assignee: MOCK_USERS[0], // Por defecto asignamos al primer usuario
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      tags: taskData.tags || [],
    };

    setTasks(prev => [...prev, task]);
    setShowTaskModal(false);
    setSelectedTask(undefined);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setShowTaskModal(true);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentTeam]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tareas</h1>
        <Button
          onClick={() => {
            setSelectedTask(undefined);
            setShowTaskModal(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Tarea
        </Button>
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
              <TableRow key={task.id} className="cursor-pointer" onClick={() => handleEditTask(task.id)}>
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

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedTask(undefined);
        }}
        initialData={selectedTask}
      />
    </div>
  );
};

export default TasksPage;
