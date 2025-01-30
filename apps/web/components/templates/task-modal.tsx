'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Task } from '@/types';
import { graphqlClient } from '@/lib/apollo-client';
import { CREATE_TASK } from '@/lib/graphql';
import { useCompany } from '@/context/company-context';
import { useTeam } from '@/context/team-context';
import { useSession } from 'next-auth/react';
import { useUser } from '@/context/user-context';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Task>;
}

interface FormErrors {
  title?: string;
  description?: string;
  status?: string;
  dueDate?: string;
}

export function TaskModal({ isOpen, onClose, initialData }: TaskModalProps) {
  const { currentCompany } = useCompany();
  const { currentTeam } = useTeam();
  const { data: session } = useSession();
  const { currentUser } = useUser();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'TODO');
  const [date, setDate] = useState<Date | undefined>(initialData?.createdAt ? new Date(initialData.createdAt) : undefined);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'TODO');
      setDate(initialData.createdAt ? new Date(initialData.createdAt) : undefined);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!status) {
      newErrors.status = 'El estado es obligatorio';
    }

    if (!date) {
      newErrors.dueDate = 'La fecha límite es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      await graphqlClient.mutate({
        mutation: CREATE_TASK,
        variables: {
          input: {
            title,
            description,
            dueDate: date,
            companyId: currentCompany?.id,
            teamId: currentTeam?.id,
            createdById: session?.user?.id,
          },
        },
      });

      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar tarea' : 'Nueva tarea'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-1">
              Título
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Título de la tarea"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setErrors(prev => ({ ...prev, title: undefined }));
              }}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1">
              Descripción
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe la tarea"
              className={cn('min-h-[100px]', errors.description ? 'border-red-500' : '')}
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="flex items-center gap-1">
              Estado
              <span className="text-red-500">*</span>
            </Label>
            <Select
              value={status}
              onValueChange={value => {
                setStatus(value);
                setErrors(prev => ({ ...prev, status: undefined }));
              }}
            >
              <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODO">Por hacer</SelectItem>
                <SelectItem value="IN_PROGRESS">En progreso</SelectItem>
                <SelectItem value="DONE">Completada</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Fecha límite
              <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', errors.dueDate && 'border-red-500')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: es }) : 'Selecciona una fecha'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={newDate => {
                    setDate(newDate);
                    setErrors(prev => ({ ...prev, dueDate: undefined }));
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{initialData ? 'Guardar cambios' : 'Crear tarea'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
