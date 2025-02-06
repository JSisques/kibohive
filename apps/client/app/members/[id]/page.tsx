'use client';

import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_PUBLIC_INFO } from '@/lib/graphql/user/queries';
import { UPDATE_USER_SKILL, ADD_USER_SKILL, DELETE_USER_SKILL } from '@/lib/graphql/user/mutations';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Lightbulb, ListTodo } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

const MemberPage = () => {
  const { id } = useParams();
  const [newSkillName, setNewSkillName] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);

  const { data, loading, error } = useQuery(GET_USER_PUBLIC_INFO, {
    variables: { id },
  });

  const [updateSkill] = useMutation(UPDATE_USER_SKILL, {
    onCompleted: () => toast.success('Habilidad actualizada correctamente'),
    onError: error => toast.error(`Error al actualizar la habilidad: ${error.message}`),
  });

  const [addSkill] = useMutation(ADD_USER_SKILL, {
    onCompleted: () => {
      toast.success('Habilidad añadida correctamente');
      setShowAddSkill(false);
      setNewSkillName('');
    },
    onError: error => toast.error(`Error al añadir la habilidad: ${error.message}`),
    refetchQueries: [{ query: GET_USER_PUBLIC_INFO, variables: { id } }],
  });

  const [deleteSkill] = useMutation(DELETE_USER_SKILL, {
    onCompleted: () => toast.success('Habilidad eliminada correctamente'),
    onError: error => toast.error(`Error al eliminar la habilidad: ${error.message}`),
    refetchQueries: [{ query: GET_USER_PUBLIC_INFO, variables: { id } }],
  });

  const handleUpdateSkill = async (skillId: string, rating: string, name: string) => {
    await updateSkill({
      variables: {
        userId: id,
        skillId,
        skill: {
          name,
          rating: parseInt(rating),
        },
      },
    });
  };

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) {
      toast.error('El nombre de la habilidad es requerido');
      return;
    }

    await addSkill({
      variables: {
        userId: id,
        skill: {
          name: newSkillName,
          rating: 0,
        },
      },
    });
  };

  const handleDeleteSkill = async (skillId: string) => {
    await deleteSkill({
      variables: {
        userId: id,
        skillId,
      },
    });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.getUserById;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              <CardTitle>Habilidades</CardTitle>
            </div>
            <Button variant="outline" onClick={() => setShowAddSkill(!showAddSkill)}>
              {showAddSkill ? 'Cancelar' : 'Añadir Habilidad'}
            </Button>
          </div>
          <CardDescription>Gestiona las habilidades y competencias del miembro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {showAddSkill && (
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Nombre de la habilidad" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} />
                <Button onClick={handleAddSkill}>Añadir</Button>
              </div>
            )}
            {user?.skills?.map((skill: any) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{skill.name}</Label>
                  <div className="flex items-center gap-2">
                    <Select defaultValue={String(skill.rating)} onValueChange={value => handleUpdateSkill(skill.id, value, skill.name)}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Nivel" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(rating => (
                          <SelectItem key={rating} value={String(rating)}>
                            {rating}/5
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(skill.id)}>
                      ✕
                    </Button>
                  </div>
                </div>
                <Progress value={(skill.rating / 5) * 100} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tareas Asignadas */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            <CardTitle>Tareas Asignadas</CardTitle>
          </div>
          <CardDescription>Tareas actuales del miembro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user?.tasks?.map((task: any) => (
              <div key={task.id} className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div className="space-y-1">
                    <span className="font-medium">{task.title}</span>
                    {task.assignmentReason && <p className="text-sm text-muted-foreground">{task.assignmentReason}</p>}
                  </div>
                  <Badge variant={task.status === 'TODO' ? 'secondary' : task.status === 'IN_PROGRESS' ? 'default' : 'outline'}>
                    {task.status === 'TODO' ? 'Por hacer' : task.status === 'IN_PROGRESS' ? 'En progreso' : 'Completada'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberPage;
