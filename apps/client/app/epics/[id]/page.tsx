'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPIC_BY_ID } from '@/lib/graphql/epics/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';

const EpicPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);
  const { data, loading, error } = useQuery(GET_EPIC_BY_ID, {
    variables: { id: resolvedParams.id },
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar la épica</div>;

  const epic = data?.getEpicById;
  const completedTasks = epic.tasks?.filter((task: any) => task.status === 'COMPLETED').length || 0;
  const totalTasks = epic.tasks?.length || 0;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Cabecera */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">{epic.title}</h1>
          <Badge variant="outline" className="text-lg px-4 py-1">
            {completedTasks}/{totalTasks} tareas
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-sm text-muted-foreground text-right">{progress.toFixed(0)}% completado</p>
        </div>
      </div>

      {/* Descripción */}
      <div className="bg-muted/50 p-6 rounded-lg">
        <p className="text-lg text-muted-foreground leading-relaxed">{epic.description}</p>
      </div>

      {/* Lista de Tareas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tareas</h2>
        <div className="grid gap-4">
          {epic.tasks?.map((task: any) => (
            <Card key={task.id} className="transition-all hover:shadow-md">
              <Link href={`/tasks/${task.id}`} className="block">
                <CardContent className="p-6 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className={`h-5 w-5 ${task.status === 'COMPLETED' ? 'text-green-500' : 'text-gray-300'}`} />
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          {format(new Date(task.createdAt), 'PPP', { locale: es })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {task.assignedTo && (
                        <div className="flex flex-col items-end gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${task.assignedTo.name}`} />
                            <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.assignedTo.name}</span>
                        </div>
                      )}
                      <Badge
                        className={
                          task.status === 'COMPLETED'
                            ? 'bg-green-500/10 text-green-500'
                            : task.status === 'IN_PROGRESS'
                              ? 'bg-blue-500/10 text-blue-500'
                              : 'bg-gray-500/10 text-gray-500'
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Pie de página */}
      <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Creado el {format(new Date(epic.createdAt), 'PPP', { locale: es })}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <span>Actualizado el {format(new Date(epic.updatedAt), 'PPP', { locale: es })}</span>
        </div>
      </div>
    </div>
  );
};

export default EpicPage;
