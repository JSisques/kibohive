'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Users, Target, Calendar, CheckSquare, KanbanSquare } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EpicModal from '@/components/organisms/epic-modal';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const TeamSettingsPage = () => {
  const { team } = useParams();
  const [isEpicModalOpen, setIsEpicModalOpen] = React.useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [inviteForm, setInviteForm] = React.useState({
    email: '',
    role: 'member',
    message: '',
  });
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

  const [teamSettings, setTeamSettings] = React.useState({
    maxTasksPerMember: 10,
    defaultTaskDuration: 'medium',
    autoAssignTasks: false,
    requireTaskDescription: true,
    allowMultipleAssignees: false,
    enableTimeTracking: true,
    defaultView: 'kanban',
    notifyOnTaskChanges: true,
    allowSubtasks: true,
    maxSubtasksPerTask: 5,
  });

  const handleInviteMember = () => {
    console.log('Invitando miembro:', inviteForm);
    setInviteForm({
      email: '',
      role: 'member',
      message: '',
    });
    setIsInviteModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">🚀 Bienvenido a {team}</h1>
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
          <Button onClick={() => setIsEpicModalOpen(true)}>
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
          <Button variant="outline" onClick={() => setIsInviteModalOpen(true)}>
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

      {/* Team Settings Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Configuración del Equipo</h2>
        </div>
        <Card>
          <CardContent className="space-y-6 pt-6">
            {/* Task Management */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Gestión de Tareas</h3>
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Máximo de tareas por miembro</Label>
                    <p className="text-sm text-muted-foreground">Límite de tareas asignadas simultáneamente</p>
                  </div>
                  <Input
                    type="number"
                    value={teamSettings.maxTasksPerMember}
                    onChange={e => setTeamSettings({ ...teamSettings, maxTasksPerMember: parseInt(e.target.value) })}
                    className="w-20"
                    min={1}
                    max={50}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Duración predeterminada</Label>
                    <p className="text-sm text-muted-foreground">Duración por defecto para nuevas tareas</p>
                  </div>
                  <Select
                    value={teamSettings.defaultTaskDuration}
                    onValueChange={value => setTeamSettings({ ...teamSettings, defaultTaskDuration: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Corta (1-2 días)</SelectItem>
                      <SelectItem value="medium">Media (3-5 días)</SelectItem>
                      <SelectItem value="long">Larga (1-2 semanas)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Asignación automática</Label>
                    <p className="text-sm text-muted-foreground">Asignar tareas automáticamente según carga de trabajo</p>
                  </div>
                  <Switch
                    checked={teamSettings.autoAssignTasks}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, autoAssignTasks: checked })}
                  />
                </div>
              </div>
            </div>

            {/* Task Requirements */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Requisitos de Tareas</h3>
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Descripción obligatoria</Label>
                    <p className="text-sm text-muted-foreground">Requerir descripción al crear tareas</p>
                  </div>
                  <Switch
                    checked={teamSettings.requireTaskDescription}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, requireTaskDescription: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Múltiples asignados</Label>
                    <p className="text-sm text-muted-foreground">Permitir asignar tareas a varios miembros</p>
                  </div>
                  <Switch
                    checked={teamSettings.allowMultipleAssignees}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, allowMultipleAssignees: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Seguimiento de tiempo</Label>
                    <p className="text-sm text-muted-foreground">Habilitar registro de tiempo en tareas</p>
                  </div>
                  <Switch
                    checked={teamSettings.enableTimeTracking}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, enableTimeTracking: checked })}
                  />
                </div>
              </div>
            </div>

            {/* View and Notifications */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Vista y Notificaciones</h3>
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vista predeterminada</Label>
                    <p className="text-sm text-muted-foreground">Vista inicial al abrir el tablero</p>
                  </div>
                  <Select value={teamSettings.defaultView} onValueChange={value => setTeamSettings({ ...teamSettings, defaultView: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kanban">Kanban</SelectItem>
                      <SelectItem value="list">Lista</SelectItem>
                      <SelectItem value="calendar">Calendario</SelectItem>
                      <SelectItem value="timeline">Timeline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones de cambios</Label>
                    <p className="text-sm text-muted-foreground">Notificar cuando se modifiquen tareas</p>
                  </div>
                  <Switch
                    checked={teamSettings.notifyOnTaskChanges}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, notifyOnTaskChanges: checked })}
                  />
                </div>
              </div>
            </div>

            {/* Subtasks */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Subtareas</h3>
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Permitir subtareas</Label>
                    <p className="text-sm text-muted-foreground">Habilitar creación de subtareas</p>
                  </div>
                  <Switch
                    checked={teamSettings.allowSubtasks}
                    onCheckedChange={checked => setTeamSettings({ ...teamSettings, allowSubtasks: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Máximo de subtareas</Label>
                    <p className="text-sm text-muted-foreground">Límite de subtareas por tarea</p>
                  </div>
                  <Input
                    type="number"
                    value={teamSettings.maxSubtasksPerTask}
                    onChange={e => setTeamSettings({ ...teamSettings, maxSubtasksPerTask: parseInt(e.target.value) })}
                    className="w-20"
                    min={1}
                    max={20}
                    disabled={!teamSettings.allowSubtasks}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de invitación */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invitar Miembro al Equipo</DialogTitle>
            <DialogDescription>Envía una invitación por correo electrónico para que se una a tu equipo.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={inviteForm.email}
                onChange={e => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label>Rol en el equipo</Label>
              <RadioGroup
                value={inviteForm.role}
                onValueChange={value => setInviteForm(prev => ({ ...prev, role: value }))}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="font-normal">
                    Administrador
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="member" id="member" />
                  <Label htmlFor="member" className="font-normal">
                    Miembro
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="viewer" id="viewer" />
                  <Label htmlFor="viewer" className="font-normal">
                    Observador
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje personalizado (opcional)</Label>
              <Textarea
                id="message"
                placeholder="Escribe un mensaje personal para la invitación..."
                value={inviteForm.message}
                onChange={e => setInviteForm(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleInviteMember} disabled={!inviteForm.email || !inviteForm.role}>
              Enviar invitación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EpicModal
        isOpen={isEpicModalOpen}
        onClose={() => setIsEpicModalOpen(false)}
        onSubmit={newEpic => {
          setEpics(prev => [
            ...prev,
            {
              ...newEpic,
              id: (prev.length + 1).toString(),
              tasksCount: 0,
              completedTasks: 0,
            },
          ]);
        }}
      />
    </div>
  );
};

export default TeamSettingsPage;
