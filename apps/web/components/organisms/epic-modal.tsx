'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HorizontalTaskCard from './horizontalTaskCard/horizontalTaskCard';

interface EpicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    title: string;
    objective: string;
    dueDate: Date;
  };
}

interface AIGeneratedSummary {
  estimatedTime: string;
  requiredResources: string[];
  suggestions: string[];
  tasksCount: number;
  tasks: {
    title: string;
    assignedTo: string;
  }[];
  estimatedComplexity: 'Baja' | 'Media' | 'Alta';
}

interface FormErrors {
  title?: string;
  objective?: string;
  date?: string;
}

export function EpicModal({ isOpen, onClose, initialData }: EpicModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState(initialData?.title || '');
  const [objective, setObjective] = useState(initialData?.objective || '');
  const [date, setDate] = useState<Date | undefined>(initialData?.dueDate);
  const [errors, setErrors] = useState<FormErrors>({});
  const [autoBreakdown, setAutoBreakdown] = useState(false);
  const [autoAssign, setAutoAssign] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setObjective(initialData.objective);
      setDate(initialData.dueDate);
    }
  }, [initialData]);

  const validateStep1 = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!objective.trim()) {
      newErrors.objective = 'El objetivo es obligatorio';
    }

    if (!date) {
      newErrors.date = 'La fecha límite es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock de datos generados por IA
  const mockAISummary: AIGeneratedSummary = {
    estimatedTime: '2 semanas',
    requiredResources: ['Frontend Developer', 'Backend Developer', 'Designer'],
    suggestions: ['Comenzar con el diseño de la arquitectura', 'Realizar pruebas de rendimiento temprano'],
    tasksCount: 10,
    tasks: [
      { title: 'Diseño de la arquitectura', assignedTo: 'Juan Pérez' },
      { title: 'Implementación del backend', assignedTo: 'María García' },
      { title: 'Diseño de la interfaz de usuario', assignedTo: 'Ana Martínez' },
      { title: 'Configuración de la base de datos', assignedTo: 'Carlos López' },
      { title: 'Implementación de autenticación', assignedTo: 'Laura Sánchez' },
      { title: 'Desarrollo de API REST', assignedTo: 'Pedro Rodríguez' },
      { title: 'Testing de integración', assignedTo: 'Sofia González' },
      { title: 'Optimización de rendimiento', assignedTo: 'Diego Fernández' },
      { title: 'Documentación técnica', assignedTo: 'Isabel Torres' },
      { title: 'Despliegue y configuración', assignedTo: 'Miguel Ruiz' },
    ],
    estimatedComplexity: 'Media',
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-1">
                Título
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Título de la épica"
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
              <Label htmlFor="objective" className="flex items-center gap-1">
                Objetivo
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="objective"
                placeholder="Describe el objetivo principal de esta épica"
                className={cn('min-h-[100px]', errors.objective ? 'border-red-500' : '')}
                value={objective}
                onChange={e => {
                  setObjective(e.target.value);
                  setErrors(prev => ({ ...prev, objective: undefined }));
                }}
              />
              {errors.objective && <p className="text-sm text-red-500">{errors.objective}</p>}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                Fecha límite estimada
                <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', errors.date && 'border-red-500')}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: es }) : 'Selecciona una fecha'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={newDate => {
                      setDate(newDate);
                      setErrors(prev => ({ ...prev, date: undefined }));
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoBreakdown">Desglose automático</Label>
                <div className="text-sm text-muted-foreground">Permite que la IA desglose la épica en tareas más pequeñas</div>
              </div>
              <Switch id="autoBreakdown" checked={autoBreakdown} onCheckedChange={setAutoBreakdown} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoAssign">Asignación automática</Label>
                <div className="text-sm text-muted-foreground">Permite que la IA asigne las tareas basándose en las habilidades del equipo</div>
              </div>
              <Switch id="autoAssign" checked={autoAssign} onCheckedChange={setAutoAssign} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {/* Resumen Principal */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Tiempo estimado</h4>
                    <p className="text-lg font-medium">{mockAISummary.estimatedTime}</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Complejidad</h4>
                    <p className="text-lg font-medium">{mockAISummary.estimatedComplexity}</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">Total tareas</h4>
                    <p className="text-lg font-medium">{mockAISummary.tasksCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tareas Generadas */}
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="p-1.5 bg-green-100 text-green-700 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </span>
                  Tareas generadas
                </h4>
                <div className="max-h-[400px] overflow-y-auto pr-2 -mr-2">
                  <div className="grid gap-3">
                    {mockAISummary.tasks.map((task, index) => (
                      <HorizontalTaskCard key={index} title={task.title} assignedTo={task.assignedTo} taskNumber={index + 1} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? 'Editar épica'
              : currentStep === 1
                ? 'Detalles básicos'
                : currentStep === 2
                  ? 'Configuración de IA'
                  : 'Resumen generado por IA'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">{renderStep()}</div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>
            Anterior
          </Button>
          <Button
            onClick={() => {
              if (currentStep === 1) {
                if (validateStep1()) {
                  setCurrentStep(2);
                }
              } else if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
              } else {
                // Aquí iría la lógica para guardar la épica
                onClose();
              }
            }}
          >
            {currentStep === 3 ? 'Finalizar' : 'Siguiente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
