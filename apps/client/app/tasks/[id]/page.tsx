'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_TASK_BY_ID } from '@/lib/graphql/tasks/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, UserIcon, FlagIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const TaskPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id },
  });

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
        <Separator className="my-6" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-red-600">
              <span className="font-medium">Error al cargar la tarea:</span>
              {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const task = data?.getTaskById;

  if (!task) {
    return (
      <div>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <span className="text-yellow-600">No se encontró la tarea solicitada</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{task.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                <FlagIcon className="w-3 h-3 mr-1" />
                {task.status}
              </Badge>
              {task.epic && (
                <Badge variant="secondary" className="text-sm">
                  {task.epic.title}
                </Badge>
              )}
            </div>
          </div>
          {task.assignedTo && (
            <div className="flex flex-col items-end gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://avatar.vercel.sh/${task.assignedTo.email}`} />
                <AvatarFallback>{task.assignedTo.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500 flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                {task.assignedTo.name}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Contenido */}
        <Card className="border-none shadow-none bg-gray-50">
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </CardContent>
        </Card>

        {/* Metadatos */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Creado: {format(new Date(task.createdAt), 'PPpp', { locale: es })}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            <span>Actualizado: {format(new Date(task.updatedAt), 'PPpp', { locale: es })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
