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
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Equipos</h1>
          <p className="text-muted-foreground mt-2">Crea y gestiona los equipos de tu organización</p>
        </div>
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

      <div className="space-y-2">
        {teams.map(team => (
          <div
            key={team.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{team.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{team.description || 'Sin descripción'}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => handleEdit(team)}>
                Editar
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(team.id)}>
                Eliminar
              </Button>
            </div>
          </div>
        ))}
        {teams.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No hay equipos creados. Crea tu primer equipo haciendo clic en "Crear Equipo".</div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
