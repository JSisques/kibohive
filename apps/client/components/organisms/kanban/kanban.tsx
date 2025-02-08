'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useMemo, useEffect } from 'react';
import KanbanCard from '@/components/molecules/kanbanCard/kanban-card';
import { Plus, Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS } from '@/lib/graphql/tasks/queries';
import { UPDATE_TASK_STATUS } from '@/lib/graphql/tasks/mutations';

interface TaskFromAPI {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo?: {
    name: string;
  };
  epic?: {
    title: string;
  };
  createdAt: string;
}

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  epic: string;
  tags?: string[];
  createdAt: string;
};

type KanbanColumn = {
  id: string;
  title: string;
  tasks: Task[];
};

export const Kanban = () => {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      page: 1,
      limit: 100,
    },
  });

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, {
    refetchQueries: ['GetTasks'],
  });

  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'TODO',
      title: 'Por hacer',
      tasks: [],
    },
    {
      id: 'IN_PROGRESS',
      title: 'En progreso',
      tasks: [],
    },
    {
      id: 'DONE',
      title: 'Completado',
      tasks: [],
    },
  ]);

  // Actualizar las columnas cuando cambien los datos
  useEffect(() => {
    if (data?.getTasks) {
      const newColumns = columns.map(column => ({
        ...column,
        tasks: [] as Task[],
      }));

      (data.getTasks as TaskFromAPI[]).forEach(task => {
        const column = newColumns.find(col => col.id === task.status);
        if (column) {
          column.tasks.push({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assignee: task.assignedTo?.name || '',
            epic: task.epic?.title || '',
            createdAt: task.createdAt,
          });
        }
      });

      setColumns(newColumns);
    }
  }, [data]);

  // Estado para controlar qué columna está en modo edición
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Nuevos estados para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [epicFilter, setEpicFilter] = useState<string>('all');

  // Obtener listas únicas para los filtros
  const uniqueAssignees = useMemo(() => {
    const assignees = new Set<string>();
    columns.forEach(column => {
      column.tasks.forEach(task => {
        if (task.assignee) assignees.add(task.assignee);
      });
    });
    return Array.from(assignees);
  }, [columns]);

  const uniqueEpics = useMemo(() => {
    const epics = new Set<string>();
    columns.forEach(column => {
      column.tasks.forEach(task => {
        if (task.epic) epics.add(task.epic);
      });
    });
    return Array.from(epics);
  }, [columns]);

  // Filtrar tareas
  const getFilteredTasks = (tasks: Task[]) => {
    return tasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesAssignee = assigneeFilter === 'all' || task.assignee === assigneeFilter;
      const matchesEpic = epicFilter === 'all' || task.epic === epicFilter;

      return matchesSearch && matchesStatus && matchesAssignee && matchesEpic;
    });
  };

  const onDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    // Si no hay destino o el destino es el mismo que el origen y el índice es el mismo, no hacemos nada
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    try {
      // Actualizar el estado en el backend
      await updateTaskStatus({
        variables: {
          id: draggableId,
          input: {
            status: destination.droppableId,
          },
        },
      });

      // Actualizar el estado local
      const newColumns = JSON.parse(JSON.stringify(columns));
      const sourceColumn = newColumns.find((col: KanbanColumn) => col.id === source.droppableId);
      const destColumn = newColumns.find((col: KanbanColumn) => col.id === destination.droppableId);

      if (!sourceColumn || !destColumn) return;

      // Obtener la tarea que se está moviendo
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

      // Actualizar el estado de la tarea
      movedTask.status = destination.droppableId;

      // Insertar la tarea en la columna de destino
      destColumn.tasks.splice(destination.index, 0, movedTask);

      // Actualizar el estado
      setColumns(newColumns);
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleAddTask = (columnId: string) => {
    if (newTaskTitle.trim() === '') {
      setEditingColumnId(null);
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: '',
      status: columnId,
      assignee: '',
      epic: '',
      createdAt: new Date().toISOString(),
    };

    const newColumns = columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: [...col.tasks, newTask],
        };
      }
      return col;
    });

    setColumns(newColumns);
    setNewTaskTitle('');
    setEditingColumnId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent, columnId: string) => {
    if (e.key === 'Enter') {
      handleAddTask(columnId);
    } else if (e.key === 'Escape') {
      setEditingColumnId(null);
      setNewTaskTitle('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] max-w-[200px] truncate">
              <span className="truncate">Estado {statusFilter !== 'all' && `(${statusFilter})`}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>Todos los estados</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('por-hacer')}>Por hacer</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('en-progreso')}>En progreso</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('completado')}>Completado</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] max-w-[200px] truncate">
              <span className="truncate">Asignado {assigneeFilter !== 'all' && `(${assigneeFilter})`}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setAssigneeFilter('all')}>Todos los miembros</DropdownMenuItem>
            {uniqueAssignees.map(assignee => (
              <DropdownMenuItem key={assignee} onClick={() => setAssigneeFilter(assignee)}>
                {assignee}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] max-w-[200px] truncate">
              <span className="truncate">Epic {epicFilter !== 'all' && `(${epicFilter})`}</span>
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEpicFilter('all')}>Todas las épicas</DropdownMenuItem>
            {uniqueEpics.map(epic => (
              <DropdownMenuItem key={epic} onClick={() => setEpicFilter(epic)}>
                {epic}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(statusFilter !== 'all' || assigneeFilter !== 'all' || epicFilter !== 'all') && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setStatusFilter('all');
              setAssigneeFilter('all');
              setEpicFilter('all');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 h-full overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map(column => (
            <div key={column.id} className="flex-shrink-0 bg-background border rounded-lg w-[350px] min-h-[500px] flex flex-col">
              {/* Header de la columna */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-foreground">{column.title}</h2>
                  <Badge variant="secondary" className="text-xs">
                    {getFilteredTasks(column.tasks).length}
                  </Badge>
                </div>
              </div>

              {/* Contenido de la columna */}
              <div className="flex-1 p-4">
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn('space-y-2 min-h-[200px] transition-colors rounded-md', snapshot.isDraggingOver && 'bg-muted')}
                    >
                      {getFilteredTasks(column.tasks).map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn('transition-all', snapshot.isDragging && 'rotate-[2deg] scale-105')}
                            >
                              <KanbanCard
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                assignee={task.assignee}
                                epic={task.epic}
                                tags={task.tags}
                                createdAt={task.createdAt}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* Input para nueva tarea o botón para mostrar input */}
                {editingColumnId === column.id ? (
                  <div className="mt-2">
                    <Input
                      autoFocus
                      placeholder="Escribe un título para la tarea..."
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      onKeyDown={e => handleKeyPress(e, column.id)}
                      onBlur={() => handleAddTask(column.id)}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full mt-4 justify-start text-muted-foreground hover:bg-muted group h-9"
                    onClick={() => setEditingColumnId(column.id)}
                  >
                    <Plus className="w-4 h-4 mr-2 group-hover:text-foreground" />
                    <span className="text-sm group-hover:text-foreground">Nueva tarea</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};
