'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Team } from '@/types';
import { graphqlClient } from '@/lib/graphql/apollo-client';
import { GET_TEAMS } from '@/lib/graphql';

const TeamsPage = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchTeams = async () => {
    const response = await graphqlClient.query({
      query: GET_TEAMS,
    });
    setTeams(response.data.getTeams);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        // Lógica para actualizar equipo
        const updatedTeams = teams.map(team => (team.id === editingTeam.id ? { ...team, ...formData } : team));
        setTeams(updatedTeams);
        toast({
          title: 'Equipo actualizado',
          description: 'El equipo se ha actualizado correctamente',
        });
      } else {
        // Lógica para crear equipo
        const newTeam: Team = {
          id: crypto.randomUUID(),
          ...formData,
          members: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setTeams([...teams, newTeam]);
        toast({
          title: 'Equipo creado',
          description: 'El equipo se ha creado correctamente',
        });
      }
      setIsOpen(false);
      setFormData({ name: '', description: '' });
      setEditingTeam(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al procesar la operación',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = (teamId: string) => {
    try {
      setTeams(teams.filter(team => team.id !== teamId));
      toast({
        title: 'Equipo eliminado',
        description: 'El equipo se ha eliminado correctamente',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al eliminar el equipo',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      description: team.description || '',
    });
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Equipos</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Crear Equipo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingTeam ? 'Editar Equipo' : 'Crear Nuevo Equipo'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input placeholder="Nombre del equipo" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Textarea
                  placeholder="Descripción"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit">{editingTeam ? 'Actualizar' : 'Crear'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map(team => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{team.description || 'Sin descripción'}</p>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handleEdit(team)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(team.id)}>
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
