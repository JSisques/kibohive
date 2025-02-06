'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK_BY_ID } from '@/lib/graphql/tasks/queries';
import { UPDATE_TASK_STATUS, UPDATE_TASK_ASSIGNMENT_REASON } from '@/lib/graphql/tasks/mutations';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, UserIcon, FlagIcon, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TaskPage = () => {
  const { id } = useParams();
  const [isEditingReason, setIsEditingReason] = useState(false);
  const [assignmentReason, setAssignmentReason] = useState('');

  const { data, loading, error } = useQuery(GET_TASK_BY_ID, {
    variables: { id },
    onCompleted: data => {
      setAssignmentReason(data.getTaskById.assignmentReason || '');
    },
  });

  const [updateStatus] = useMutation(UPDATE_TASK_STATUS, {
    onCompleted: () => toast.success('Estado actualizado correctamente'),
    onError: error => toast.error(`Error al actualizar el estado: ${error.message}`),
  });

  const [updateAssignmentReason] = useMutation(UPDATE_TASK_ASSIGNMENT_REASON, {
    onCompleted: () => {
      toast.success('Motivo de asignación actualizado correctamente');
      setIsEditingReason(false);
    },
    onError: error => toast.error(`Error al actualizar el motivo: ${error.message}`),
  });

  const handleStatusChange = async (status: string) => {
    await updateStatus({
      variables: {
        id,
        input: {
          status,
        },
      },
    });
  };

  const handleSaveReason = async () => {
    await updateAssignmentReason({
      variables: {
        id,
        reason: assignmentReason,
      },
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const task = data.getTaskById;

  return (
    <div>
      <div className="space-y-6">
        {/* Encabezado */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{task.title}</h1>
            <div className="flex items-center gap-2">
              <Select defaultValue={task.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">Por hacer</SelectItem>
                  <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                  <SelectItem value="DONE">Completada</SelectItem>
                </SelectContent>
              </Select>
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

        {/* Motivo de asignación */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Motivo de asignación</h3>
              </div>
              {!isEditingReason && (
                <Button variant="ghost" onClick={() => setIsEditingReason(true)}>
                  Editar
                </Button>
              )}
            </div>
            {isEditingReason ? (
              <div className="space-y-2">
                <Textarea
                  value={assignmentReason}
                  onChange={e => setAssignmentReason(e.target.value)}
                  placeholder="Explica por qué se asignó esta tarea a este miembro..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditingReason(false);
                      setAssignmentReason(task.assignmentReason || '');
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveReason}>Guardar</Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">{task.assignmentReason || 'No se ha especificado un motivo de asignación.'}</p>
            )}
          </CardContent>
        </Card>

        {/* Metadatos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Creada el</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(task.createdAt), 'PPP', { locale: es })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Última actualización</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(task.updatedAt), 'PPP', { locale: es })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
