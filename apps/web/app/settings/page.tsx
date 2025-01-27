'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Users, Shield, Palette, Clock, Mail } from 'lucide-react';

const SettingsPage = () => {
  const { team } = useParams();

  // Estados para las diferentes configuraciones
  const [generalSettings, setGeneralSettings] = React.useState({
    teamName: 'Equipo Awesome',
    teamDescription: 'Equipo de desarrollo full-stack',
    timezone: 'Europe/Madrid',
    language: 'es',
    defaultView: 'kanban',
  });

  const [taskSettings, setTaskSettings] = React.useState({
    maxTasksPerMember: 10,
    defaultTaskDuration: 'medium',
    requireTaskDescription: true,
    allowMultipleAssignees: false,
    enableTimeTracking: true,
    autoAssignTasks: false,
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailNotifications: true,
    taskAssigned: true,
    taskCompleted: true,
    taskOverdue: true,
    dailyDigest: true,
    weeklyReport: true,
  });

  const teamMembers = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana@ejemplo.com',
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      status: 'active',
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      email: 'carlos@ejemplo.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      status: 'active',
    },
    {
      id: '3',
      name: 'Elena Martín',
      email: 'elena@ejemplo.com',
      role: 'member',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      status: 'inactive',
    },
  ];

  return (
    <div className="flex flex-col space-y-6 ">
      <div>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Gestiona la configuración de {team}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Miembros</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información del Equipo</CardTitle>
              <CardDescription>Configura la información básica de tu equipo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Nombre del Equipo</Label>
                <Input
                  id="teamName"
                  value={generalSettings.teamName}
                  onChange={e => setGeneralSettings({ ...generalSettings, teamName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamDescription">Descripción</Label>
                <Input
                  id="teamDescription"
                  value={generalSettings.teamDescription}
                  onChange={e => setGeneralSettings({ ...generalSettings, teamDescription: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select value={generalSettings.timezone} onValueChange={value => setGeneralSettings({ ...generalSettings, timezone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Madrid">Europa/Madrid</SelectItem>
                      <SelectItem value="America/New_York">América/Nueva York</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={generalSettings.language} onValueChange={value => setGeneralSettings({ ...generalSettings, language: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Visualización</CardTitle>
              <CardDescription>Personaliza cómo se muestra la información</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultView">Vista Predeterminada</Label>
                <Select value={generalSettings.defaultView} onValueChange={value => setGeneralSettings({ ...generalSettings, defaultView: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kanban">Kanban</SelectItem>
                    <SelectItem value="list">Lista</SelectItem>
                    <SelectItem value="calendar">Calendario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Miembros del Equipo</CardTitle>
              <CardDescription>Gestiona los miembros y sus roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={member.status === 'active' ? 'secondary' : 'outline'}>{member.status}</Badge>
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Miembro</SelectItem>
                          <SelectItem value="viewer">Observador</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Invitar Miembro
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
              <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por correo</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Asignación de Tareas</Label>
                      <p className="text-sm text-muted-foreground">Cuando te asignan una nueva tarea</p>
                    </div>
                    <Switch
                      checked={notificationSettings.taskAssigned}
                      onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, taskAssigned: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tareas Completadas</Label>
                      <p className="text-sm text-muted-foreground">Cuando se completa una tarea de tu equipo</p>
                    </div>
                    <Switch
                      checked={notificationSettings.taskCompleted}
                      onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, taskCompleted: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tareas Vencidas</Label>
                      <p className="text-sm text-muted-foreground">Cuando una tarea está próxima a vencer</p>
                    </div>
                    <Switch
                      checked={notificationSettings.taskOverdue}
                      onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, taskOverdue: checked })}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Resumen Diario</Label>
                      <p className="text-sm text-muted-foreground">Recibe un resumen diario de actividades</p>
                    </div>
                    <Switch
                      checked={notificationSettings.dailyDigest}
                      onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, dailyDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reporte Semanal</Label>
                      <p className="text-sm text-muted-foreground">Recibe un reporte semanal del progreso</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyReport}
                      onCheckedChange={checked => setNotificationSettings({ ...notificationSettings, weeklyReport: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Tareas</CardTitle>
              <CardDescription>Personaliza cómo se gestionan las tareas en tu equipo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Máximo de tareas por miembro</Label>
                    <p className="text-sm text-muted-foreground">Límite de tareas asignadas simultáneamente</p>
                  </div>
                  <Input
                    type="number"
                    value={taskSettings.maxTasksPerMember}
                    onChange={e => setTaskSettings({ ...taskSettings, maxTasksPerMember: parseInt(e.target.value) })}
                    className="w-20"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Duración predeterminada</Label>
                    <p className="text-sm text-muted-foreground">Duración por defecto para nuevas tareas</p>
                  </div>
                  <Select
                    value={taskSettings.defaultTaskDuration}
                    onValueChange={value => setTaskSettings({ ...taskSettings, defaultTaskDuration: value })}
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

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Descripción obligatoria</Label>
                    <p className="text-sm text-muted-foreground">Requerir descripción al crear tareas</p>
                  </div>
                  <Switch
                    checked={taskSettings.requireTaskDescription}
                    onCheckedChange={checked => setTaskSettings({ ...taskSettings, requireTaskDescription: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Múltiples asignados</Label>
                    <p className="text-sm text-muted-foreground">Permitir asignar tareas a varios miembros</p>
                  </div>
                  <Switch
                    checked={taskSettings.allowMultipleAssignees}
                    onCheckedChange={checked => setTaskSettings({ ...taskSettings, allowMultipleAssignees: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Seguimiento de tiempo</Label>
                    <p className="text-sm text-muted-foreground">Habilitar registro de tiempo en tareas</p>
                  </div>
                  <Switch
                    checked={taskSettings.enableTimeTracking}
                    onCheckedChange={checked => setTaskSettings({ ...taskSettings, enableTimeTracking: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Asignación automática</Label>
                    <p className="text-sm text-muted-foreground">Asignar tareas según carga de trabajo</p>
                  </div>
                  <Switch
                    checked={taskSettings.autoAssignTasks}
                    onCheckedChange={checked => setTaskSettings({ ...taskSettings, autoAssignTasks: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button>Guardar Cambios</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
