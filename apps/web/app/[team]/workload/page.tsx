'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart2, Clock, CheckCircle2, AlertTriangle, Users } from 'lucide-react';

// Tipos
type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'overdue';
type TaskPriority = 'high' | 'medium' | 'low';

interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  workload: {
    current: number;
    tasks: Task[];
  };
}

// Datos de ejemplo
const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Ana García',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    workload: {
      current: 75,
      tasks: [
        { id: 1, name: 'Diseño de landing', status: 'in-progress', priority: 'high', dueDate: '2024-03-20' },
        { id: 2, name: 'Optimización de rendimiento', status: 'pending', priority: 'medium', dueDate: '2024-03-22' },
        { id: 3, name: 'Corrección de bugs', status: 'completed', priority: 'high', dueDate: '2024-03-18' },
      ],
    },
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    workload: {
      current: 60,
      tasks: [
        { id: 4, name: 'API de autenticación', status: 'in-progress', priority: 'high', dueDate: '2024-03-21' },
        { id: 5, name: 'Optimización de base de datos', status: 'pending', priority: 'low', dueDate: '2024-03-25' },
      ],
    },
  },
  {
    id: '3',
    name: 'Elena Martín',
    role: 'UI/UX Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    workload: {
      current: 40,
      tasks: [
        { id: 6, name: 'Diseño de componentes', status: 'in-progress', priority: 'medium', dueDate: '2024-03-23' },
        { id: 7, name: 'Prototipo móvil', status: 'completed', priority: 'high', dueDate: '2024-03-19' },
        { id: 8, name: 'User research', status: 'pending', priority: 'medium', dueDate: '2024-03-24' },
      ],
    },
  },
];

const STATUS_COLORS = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800',
} as const;

const WorkloadPage = () => {
  const totalTasks = MOCK_MEMBERS.reduce((acc, member) => acc + member.workload.tasks.length, 0);
  const completedTasks = MOCK_MEMBERS.reduce((acc, member) => acc + member.workload.tasks.filter(task => task.status === 'completed').length, 0);
  const inProgressTasks = MOCK_MEMBERS.reduce((acc, member) => acc + member.workload.tasks.filter(task => task.status === 'in-progress').length, 0);
  const overdueTasks = MOCK_MEMBERS.reduce((acc, member) => acc + member.workload.tasks.filter(task => task.status === 'overdue').length, 0);

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Carga de Trabajo</h1>
        <p className="text-muted-foreground">Gestiona y monitoriza la carga de trabajo del equipo</p>
      </div>

      {/* Métricas generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">Asignadas al equipo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">Tareas activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Finalizadas con éxito</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">Necesitan atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de distribución de carga */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Carga</CardTitle>
          <CardDescription>Vista detallada de la carga de trabajo por miembro</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miembro</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Carga Actual</TableHead>
                <TableHead>Tareas Activas</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_MEMBERS.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="w-full flex flex-row items-center justify-between">
                      <Progress value={member.workload.current} className="h-2" />
                      <span className="text-sm text-muted-foreground text-right">{member.workload.current}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{member.workload.tasks.filter(task => task.status === 'in-progress').length} tareas activas</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.workload.current > 80 ? 'destructive' : member.workload.current > 60 ? 'secondary' : 'outline'}>
                      {member.workload.current > 80 ? 'Sobrecargado' : member.workload.current > 60 ? 'Ocupado' : 'Disponible'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkloadPage;
