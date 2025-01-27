'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart2, Clock, CheckCircle2, AlertTriangle, Users, ArrowRight } from 'lucide-react';

const DashboardPage = () => {
  const { team } = useParams();

  // Datos de ejemplo - En producción vendrían de una API
  const teamMetrics = {
    totalTasks: 35,
    completedTasks: 22,
    overdueTasks: 3,
    upcomingDeadlines: 5,
    completionRate: 63,
    activeMembers: 5,
  };

  const recentActivity = [
    { id: 1, type: 'task_completed', user: 'Ana García', task: 'Diseño de landing page', timestamp: '2h ago' },
    { id: 2, type: 'task_assigned', user: 'Carlos Ruiz', task: 'Implementar autenticación', timestamp: '3h ago' },
    { id: 3, type: 'epic_created', user: 'Elena Martín', task: 'Rediseño de dashboard', timestamp: '5h ago' },
    { id: 4, type: 'task_overdue', user: 'Juan Pérez', task: 'Optimización de rendimiento', timestamp: '1d ago' },
  ];

  const priorityTasks = [
    {
      id: '1',
      title: 'Implementar autenticación',
      assignee: { name: 'Carlos R.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
      dueDate: '2024-03-20',
      status: 'en-progreso',
      progress: 45,
    },
    {
      id: '2',
      title: 'Optimización de rendimiento',
      assignee: { name: 'Ana G.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
      dueDate: '2024-03-22',
      status: 'por-hacer',
      progress: 0,
    },
    {
      id: '3',
      title: 'Diseño de nueva landing',
      assignee: { name: 'Elena M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
      dueDate: '2024-03-21',
      status: 'en-progreso',
      progress: 75,
    },
  ];

  const teamWorkload = [
    { name: 'Ana García', role: 'Frontend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', workload: 75 },
    { name: 'Carlos Ruiz', role: 'Backend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', workload: 60 },
    { name: 'Elena Martín', role: 'UI/UX', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', workload: 40 },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard de {team}</h1>
          <p className="text-muted-foreground">Vista general del progreso y actividad del equipo</p>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progreso General</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{teamMetrics.completionRate}%</div>
              <Progress value={teamMetrics.completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {teamMetrics.completedTasks} de {teamMetrics.totalTasks} tareas completadas
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.totalTasks - teamMetrics.completedTasks}</div>
            <p className="text-xs text-muted-foreground">En progreso actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximos Vencimientos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">En los próximos 7 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics.activeMembers}</div>
            <p className="text-xs text-muted-foreground">Contribuyendo activamente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tareas Prioritarias */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas Prioritarias</CardTitle>
            <CardDescription>Tareas que requieren atención inmediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{task.title}</p>
                      <Badge variant={task.status === 'en-progreso' ? 'secondary' : 'outline'}>{task.status}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{task.assignee.name}</span>
                      <span>•</span>
                      <span>Vence: {task.dueDate}</span>
                    </div>
                  </div>
                  <div className="w-[100px]">
                    <div className="flex items-center justify-end gap-2">
                      <Progress value={task.progress} className="h-2 w-[60px]" />
                      <span className="text-sm text-muted-foreground">{task.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas actualizaciones del equipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="mt-1">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.type === 'task_completed' && 'completó'}
                      {activity.type === 'task_assigned' && 'fue asignado a'}
                      {activity.type === 'epic_created' && 'creó el epic'}
                      {activity.type === 'task_overdue' && 'tiene pendiente'} <span className="font-medium">{activity.task}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carga de Trabajo del Equipo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribución de Carga de Trabajo</CardTitle>
            <CardDescription>Estado actual de la carga de trabajo por miembro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamWorkload.map(member => (
                <div key={member.name} className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <Badge variant={member.workload > 80 ? 'destructive' : member.workload > 60 ? 'secondary' : 'outline'}>
                        {member.workload}% Carga
                      </Badge>
                    </div>
                    <Progress value={member.workload} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
