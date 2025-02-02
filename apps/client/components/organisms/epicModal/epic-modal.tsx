import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';

interface EpicModalProps {
  onSubmit: (data: { title: string; description: string }) => void;
}

const EpicModal: React.FC<EpicModalProps> = ({ onSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    setOpen(false);
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
