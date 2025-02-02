import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useMutation, useQuery } from '@apollo/client';
import { useOrganization } from '@clerk/nextjs';
import { GET_COMPANY_BY_CLERK_ID, CREATE_EPIC } from '@/lib/graphql';

interface EpicModalProps {
  companyId: string;
}

const EpicModal = ({ companyId }: EpicModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [autoAssign, setAutoAssign] = useState(false);
  const [createEpic, { loading: createEpicLoading }] = useMutation(CREATE_EPIC);
  const [isLoading, setIsLoading] = useState(false);

  console.log(companyId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createEpic({
        variables: {
          input: {
            title: title,
            description: description,
            companyId: companyId,
          },
        },
      });

      setOpen(false);
    } catch (error) {
      console.error('Error al crear la épica:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Nueva Épica
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Épica</DialogTitle>
          <DialogDescription>Crea una nueva épica para organizar tus tareas. Las épicas son grupos de tareas relacionadas.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nombre de la épica" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe el objetivo de esta épica"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="ai-tasks" checked={useAI} onCheckedChange={setUseAI} />
            <Label htmlFor="ai-tasks">Desglosar en tareas mediante IA</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-assign" checked={autoAssign} onCheckedChange={setAutoAssign} />
            <Label htmlFor="auto-assign">Asignar tareas automáticamente</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Épica</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EpicModal;
