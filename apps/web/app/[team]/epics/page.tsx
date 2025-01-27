'use client';

import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Sparkles, Calendar, ListTodo, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { EpicModal } from '@/components/organisms/epic-modal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

interface Epic {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  tasksCount: number;
  completedTasks: number;
  isAiProcessing?: boolean;
}

const MOCK_EPICS: Epic[] = [
  {
    id: '1',
    title: 'Rediseño de la Plataforma',
    description: 'Modernizar la interfaz de usuario y mejorar la experiencia del usuario en toda la plataforma',
    status: 'En Progreso',
    dueDate: '2024-04-01',
    tasksCount: 12,
    completedTasks: 5,
  },
  {
    id: '2',
    title: 'Integración de IA',
    description: 'Implementar funcionalidades de IA para automatizar procesos y mejorar la productividad',
    status: 'Planificado',
    dueDate: '2024-05-15',
    tasksCount: 8,
    completedTasks: 0,
  },
  {
    id: '3',
    title: 'Optimización de Rendimiento',
    description: 'Mejorar los tiempos de carga y la eficiencia general de la aplicación',
    status: 'Completado',
    dueDate: '2024-03-01',
    tasksCount: 6,
    completedTasks: 6,
  },
];

const STATUS_COLORS = {
  Planificado: 'bg-yellow-100 text-yellow-800',
  'En Progreso': 'bg-blue-100 text-blue-800',
  Completado: 'bg-green-100 text-green-800',
  Cancelado: 'bg-red-100 text-red-800',
};

const EpicsPage = () => {
  const [epics, setEpics] = useState<Epic[]>(MOCK_EPICS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showEpicModal, setShowEpicModal] = useState(false);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [selectedEpic, setSelectedEpic] = useState<Epic | null>(null);

  const filteredEpics = epics.filter(epic => {
    const matchesSearch =
      epic.title.toLowerCase().includes(searchQuery.toLowerCase()) || epic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || epic.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateEpic = (epicData: Omit<Epic, 'id' | 'tasksCount' | 'completedTasks'>) => {
    const newEpic: Epic = {
      ...epicData,
      id: (epics.length + 1).toString(),
      tasksCount: 0,
      completedTasks: 0,
    };
    setEpics(prev => [...prev, newEpic]);
  };

  const handleAiProcess = (epic: Epic, action: 'desglose' | 'asignacion') => {
    setSelectedEpic(epic);
    setShowAiDialog(true);
    // Simular procesamiento de IA
    const updatedEpics = epics.map(e => (e.id === epic.id ? { ...e, isAiProcessing: true } : e));
    setEpics(updatedEpics);

    // Simulación de proceso de IA (se reemplazaría con la llamada real)
    setTimeout(() => {
      const updatedEpicsAfterAi = epics.map(e =>
        e.id === epic.id
          ? {
              ...e,
              isAiProcessing: false,
              tasksCount: action === 'desglose' ? e.tasksCount + 5 : e.tasksCount,
            }
          : e,
      );
      setEpics(updatedEpicsAfterAi);
      setShowAiDialog(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Épicas</h1>
        <Button onClick={() => setShowEpicModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Épica
        </Button>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar épicas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Estado {statusFilter && `(${statusFilter})`}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('')}>Todos</DropdownMenuItem>
            {Object.keys(STATUS_COLORS).map(status => (
              <DropdownMenuItem key={status} onClick={() => setStatusFilter(status)}>
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Épica</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Progreso</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEpics.map(epic => (
              <TableRow key={epic.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{epic.title}</div>
                    <div className="text-sm text-muted-foreground">{epic.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[epic.status as keyof typeof STATUS_COLORS]}>{epic.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Progress value={(epic.completedTasks / epic.tasksCount) * 100 || 0} />
                    <div className="text-sm text-muted-foreground">
                      {epic.completedTasks} de {epic.tasksCount} tareas completadas
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(epic.dueDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAiProcess(epic, 'desglose')} disabled={epic.isAiProcessing}>
                      <ListTodo className="mr-2 h-4 w-4" />
                      Desglosar Tareas
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAiProcess(epic, 'asignacion')}
                      disabled={epic.isAiProcessing || epic.tasksCount === 0}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Asignar Tareas
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EpicModal isOpen={showEpicModal} onClose={() => setShowEpicModal(false)} />

      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Procesando con IA</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Sparkles className="h-12 w-12 animate-pulse text-purple-500" />
            <p className="text-center text-muted-foreground">
              La IA está {selectedEpic?.isAiProcessing ? 'analizando la épica y creando tareas...' : 'asignando las tareas al equipo...'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EpicsPage;
