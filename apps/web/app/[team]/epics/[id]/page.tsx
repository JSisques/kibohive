'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, Clock, ListTodo, Users } from 'lucide-react';
import HorizontalTaskCard from '@/components/organisms/horizontalTaskCard/horizontalTaskCard';
import { EpicModal } from '@/components/organisms/epic-modal';

// Mock data - Reemplazar con datos reales
const epicData = {
  title: 'Implementación del Sistema de Autenticación',
  objective:
    'Desarrollar e implementar un sistema de autenticación seguro y escalable que soporte múltiples métodos de inicio de sesión y cumpla con los estándares de seguridad actuales.',
  progress: 65,
  startDate: '2024-03-01',
  dueDate: '2024-04-15',
  estimatedTime: '6 semanas',
  complexity: 'Alta',
  status: 'En progreso',
  owner: {
    name: 'María García',
    avatar: 'https://avatar.vercel.sh/maria.png',
  },
  team: [
    { name: 'Juan Pérez', avatar: 'https://avatar.vercel.sh/juan.png' },
    { name: 'Ana López', avatar: 'https://avatar.vercel.sh/ana.png' },
    { name: 'Carlos Ruiz', avatar: 'https://avatar.vercel.sh/carlos.png' },
  ],
  tasks: [
    { title: 'Diseño de la arquitectura de autenticación', assignedTo: 'Juan Pérez', status: 'Completado' },
    { title: 'Implementación de OAuth 2.0', assignedTo: 'María García', status: 'En progreso' },
    { title: 'Desarrollo de UI de login', assignedTo: 'Ana López', status: 'En progreso' },
    { title: 'Testing de seguridad', assignedTo: 'Carlos Ruiz', status: 'Pendiente' },
  ],
};

export default function EpicPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditEpic = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="container space-y-8">
        {/* Cabecera */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{epicData.title}</h1>
            <p className="text-muted-foreground">{epicData.objective}</p>
          </div>
          <Button onClick={handleEditEpic}>Editar Épica</Button>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Tiempo estimado</p>
                  <p className="font-medium">{epicData.estimatedTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                  <ListTodo className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Complejidad</p>
                  <p className="font-medium">{epicData.complexity}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Fecha límite</p>
                  <p className="font-medium">{epicData.dueDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Miembros</p>
                  <p className="font-medium">{epicData.team.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progreso */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Completado</span>
                <span className="font-medium">{epicData.progress}%</span>
              </div>
              <Progress value={epicData.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Contenido principal */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList>
            <TabsTrigger value="tasks">Tareas</TabsTrigger>
            <TabsTrigger value="team">Equipo</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4 mt-6">
            {epicData.tasks.map((task, index) => (
              <HorizontalTaskCard key={index} title={task.title} assignedTo={task.assignedTo} taskNumber={index + 1} />
            ))}
          </TabsContent>

          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Miembros del equipo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={epicData.owner.avatar} />
                      <AvatarFallback>MG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{epicData.owner.name}</p>
                      <p className="text-sm text-muted-foreground">Propietario de la épica</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-4">Colaboradores</p>
                    <div className="grid gap-4">
                      {epicData.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{member.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de edición */}
      <EpicModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        initialData={{
          title: epicData.title,
          objective: epicData.objective,
          dueDate: new Date(epicData.dueDate),
        }}
      />
    </>
  );
}
