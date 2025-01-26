'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Users, Target, Calendar, CheckSquare, KanbanSquare } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TeamSettingsPage = () => {
  const { team } = useParams();
  const [epics, setEpics] = React.useState([
    {
      id: '1',
      title: 'Mejora de UX',
      description: 'Mejorar la experiencia de usuario en toda la aplicación',
      status: 'En Progreso',
      dueDate: '2024-04-30',
      tasksCount: 8,
      completedTasks: 3,
    },
    {
      id: '2',
      title: 'Integración de IA',
      description: 'Implementar funcionalidades de IA en el producto',
      status: 'Planificado',
      dueDate: '2024-05-15',
      tasksCount: 12,
      completedTasks: 0,
    },
  ]);

  const teamMembers = [
    { id: '1', name: 'Ana García', role: 'Team Lead', tasksCount: 15, completedTasks: 8 },
    { id: '2', name: 'Carlos Ruiz', role: 'Developer', tasksCount: 12, completedTasks: 5 },
    { id: '3', name: 'Elena Martín', role: 'Designer', tasksCount: 8, completedTasks: 6 },
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">⚙️ Configuración del Equipo</h1>
          <Button onClick={() => (window.location.href = `/${team}/board`)}>
            <KanbanSquare className="h-4 w-4 mr-2" />
            Ir al Tablero
          </Button>
        </div>
        <p className="text-muted-foreground">Gestiona tu equipo, épicas y obtén una visión general del progreso</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Miembros del Equipo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">Activos en el último mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Épicas Activas</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{epics.length}</div>
            <p className="text-xs text-muted-foreground">En progreso y planificadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Totales</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.reduce((acc, member) => acc + member.tasksCount, 0)}</div>
            <p className="text-xs text-muted-foreground">Asignadas al equipo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Completado</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (teamMembers.reduce((acc, member) => acc + member.completedTasks, 0) /
                  teamMembers.reduce((acc, member) => acc + member.tasksCount, 0)) *
                  100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">En el último mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Épicas Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Épicas</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Épica
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Título</TableHead>
                <TableHead className="w-[300px]">Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Progreso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {epics.map(epic => (
                <TableRow key={epic.id}>
                  <TableCell className="font-medium">{epic.title}</TableCell>
                  <TableCell>{epic.description}</TableCell>
                  <TableCell>{epic.status}</TableCell>
                  <TableCell>{epic.dueDate}</TableCell>
                  <TableCell>{Math.round((epic.completedTasks / epic.tasksCount) * 100)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Team Members Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Miembros del Equipo</h2>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Invitar Miembro
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Tareas Asignadas</TableHead>
                <TableHead>Tareas Completadas</TableHead>
                <TableHead>Tasa de Completado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.tasksCount}</TableCell>
                  <TableCell>{member.completedTasks}</TableCell>
                  <TableCell>{Math.round((member.completedTasks / member.tasksCount) * 100)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default TeamSettingsPage;
