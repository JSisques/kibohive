'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Sparkles, Brain, Users, ListTodo, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Epic {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  tasksCount: number;
  completedTasks: number;
  aiOptions?: {
    autoDesglose: boolean;
    autoAsignacion: boolean;
    complejidadEstimada?: string;
    tiempoEstimado?: string;
    recursosNecesarios?: string[];
  };
}

interface EpicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (epic: Omit<Epic, 'id' | 'tasksCount' | 'completedTasks'>) => void;
}

const STEPS = [
  { id: 'detalles', title: 'Detalles Básicos' },
  { id: 'ia', title: 'Asistente IA' },
  { id: 'confirmacion', title: 'Confirmación' },
];

const EpicModal: React.FC<EpicModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Planificado',
    dueDate: '',
    aiOptions: {
      autoDesglose: true,
      autoAsignacion: true,
      complejidadEstimada: '',
      tiempoEstimado: '',
      recursosNecesarios: [],
    },
  });
  const [aiAnalysis, setAiAnalysis] = useState<{
    complejidad?: string;
    tiempoEstimado?: string;
    recursosNecesarios?: string[];
    sugerencias?: string[];
  }>({});

  const handleAiAnalyze = () => {
    setIsAnalyzing(true);
    // Simulación de análisis de IA
    setTimeout(() => {
      setAiAnalysis({
        complejidad: 'Media',
        tiempoEstimado: '2 semanas',
        recursosNecesarios: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer'],
        sugerencias: ['Dividir en módulos independientes', 'Comenzar con un MVP', 'Realizar pruebas de usuario temprano'],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      status: 'Planificado',
    });
    setFormData({
      title: '',
      description: '',
      status: 'Planificado',
      dueDate: '',
      aiOptions: {
        autoDesglose: true,
        autoAsignacion: true,
        complejidadEstimada: '',
        tiempoEstimado: '',
        recursosNecesarios: [],
      },
    });
    setAiAnalysis({});
    setCurrentStep(0);
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.title && formData.description && formData.dueDate;
      case 1:
        // Si el desglose automático está desactivado o ya tenemos análisis de IA, permitir avanzar
        return !formData.aiOptions.autoDesglose || Object.keys(aiAnalysis).length > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Rediseño del Dashboard"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Objetivo y Alcance</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe el objetivo principal y qué se pretende conseguir con esta épica"
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Fecha límite estimada</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Desglose Automático</Label>
                  <div className="text-sm text-muted-foreground">La IA desglosará la épica en tareas más pequeñas</div>
                </div>
                <Switch
                  checked={formData.aiOptions.autoDesglose}
                  onCheckedChange={checked =>
                    setFormData({
                      ...formData,
                      aiOptions: { ...formData.aiOptions, autoDesglose: checked },
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label>Asignación Automática</Label>
                  <div className="text-sm text-muted-foreground">La IA asignará las tareas al equipo según sus habilidades</div>
                </div>
                <Switch
                  checked={formData.aiOptions.autoAsignacion}
                  onCheckedChange={checked =>
                    setFormData({
                      ...formData,
                      aiOptions: { ...formData.aiOptions, autoAsignacion: checked },
                    })
                  }
                />
              </div>

              {formData.aiOptions.autoDesglose && (
                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={handleAiAnalyze}
                    className="w-full"
                    disabled={!formData.title || !formData.description || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Analizar con IA
                      </>
                    )}
                  </Button>
                </div>
              )}

              {Object.keys(aiAnalysis).length > 0 && (
                <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium">Análisis de la IA</h4>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-4 w-4" />
                      <span className="text-sm">Complejidad estimada: {aiAnalysis.complejidad}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Tiempo estimado: {aiAnalysis.tiempoEstimado}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Recursos necesarios:</span>
                    </div>
                    <ul className="text-sm list-disc list-inside ml-4">
                      {aiAnalysis.recursosNecesarios?.map((recurso, index) => <li key={index}>{recurso}</li>)}
                    </ul>
                    <div className="mt-2">
                      <span className="text-sm font-medium">Sugerencias:</span>
                      <ul className="text-sm list-disc list-inside ml-4">
                        {aiAnalysis.sugerencias?.map((sugerencia, index) => <li key={index}>{sugerencia}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="border rounded-lg p-6 space-y-6 bg-muted/10">
              {/* Detalles Básicos */}
              <div>
                <h4 className="text-base font-semibold mb-3 flex items-center">
                  <ListTodo className="h-4 w-4 mr-2" />
                  Detalles de la Épica
                </h4>
                <div className="grid gap-2 text-sm pl-6">
                  <p>
                    <span className="font-medium">Título:</span> {formData.title}
                  </p>
                  <p>
                    <span className="font-medium">Objetivo:</span> {formData.description}
                  </p>
                  <p>
                    <span className="font-medium">Fecha límite:</span> {new Date(formData.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Análisis de IA */}
              {Object.keys(aiAnalysis).length > 0 && (
                <div>
                  <h4 className="text-base font-semibold mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-2" />
                    Análisis y Estimaciones
                  </h4>
                  <div className="grid gap-3 pl-6">
                    <div className="grid gap-2 text-sm">
                      <p>
                        <span className="font-medium">Complejidad estimada:</span> {aiAnalysis.complejidad}
                      </p>
                      <p>
                        <span className="font-medium">Tiempo estimado:</span> {aiAnalysis.tiempoEstimado}
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-1">Recursos necesarios:</p>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.recursosNecesarios?.map((recurso, index) => (
                          <div key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {recurso}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm mb-1">Sugerencias de implementación:</p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {aiAnalysis.sugerencias?.map((sugerencia, index) => <li key={index}>{sugerencia}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Acciones de IA */}
              <div>
                <h4 className="text-base font-semibold mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Acciones Automáticas
                </h4>
                <div className="grid gap-4 pl-6">
                  {formData.aiOptions.autoDesglose && (
                    <div>
                      <p className="font-medium text-sm mb-2">Desglose de Tareas</p>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="text-muted-foreground mb-2">La IA creará automáticamente las siguientes tareas basadas en el análisis:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Configuración inicial y setup del proyecto</li>
                          <li>Investigación y documentación de requisitos</li>
                          <li>Desarrollo de componentes principales</li>
                          <li>Implementación de funcionalidades core</li>
                          <li>Testing y validación</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {formData.aiOptions.autoAsignacion && (
                    <div>
                      <p className="font-medium text-sm mb-2">Plan de Asignación</p>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        <p className="text-muted-foreground mb-2">Las tareas se asignarán automáticamente según las habilidades del equipo:</p>
                        <div className="space-y-2">
                          {aiAnalysis.recursosNecesarios?.map((recurso, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span>{recurso}:</span>
                              <span className="text-muted-foreground">
                                {index === 0
                                  ? 'Tareas de frontend y UI'
                                  : index === 1
                                    ? 'Desarrollo backend y API'
                                    : 'Diseño de interfaz y experiencia'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Al crear la épica, la IA comenzará automáticamente a{' '}
                {formData.aiOptions.autoDesglose && formData.aiOptions.autoAsignacion
                  ? 'desglosar las tareas y asignarlas al equipo'
                  : formData.aiOptions.autoDesglose
                    ? 'desglosar las tareas'
                    : 'asignar las tareas'}
                .
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Crear Nueva Épica</DialogTitle>
            <DialogDescription>Define el objetivo y alcance de tu épica, y deja que la IA te ayude a planificarla.</DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="mb-8">
              <div className="relative flex justify-between mb-2">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={cn('flex flex-col items-center', {
                      'text-muted-foreground': currentStep !== index,
                    })}
                    style={{ width: '33.333%' }}
                  >
                    <div
                      className={cn('flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2 font-medium text-sm transition-colors', {
                        'border-primary bg-primary text-white': currentStep >= index,
                        'border-muted bg-background': currentStep < index,
                      })}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                    {index < STEPS.length - 1 && (
                      <div
                        className={cn('absolute h-[2px] top-4 -z-10', {
                          'bg-primary': currentStep > index,
                          'bg-muted': currentStep <= index,
                        })}
                        style={{
                          left: `calc(${(index + 1) * 33.333}% - 4rem)`,
                          width: '4rem',
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[300px]">{renderStepContent()}</div>

            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handlePreviousStep} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              {currentStep === STEPS.length - 1 ? (
                <Button type="submit" className="bg-primary">
                  Crear Épica
                </Button>
              ) : (
                <Button type="button" onClick={handleNextStep} disabled={!canProceed()}>
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EpicModal;
