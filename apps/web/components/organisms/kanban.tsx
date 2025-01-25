'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import TaskCard from '../molecules/tasks/task-card';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

type KanbanColumn = {
  id: string;
  title: string;
  tasks: Task[];
};

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

export const Kanban = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'Por hacer',
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'por-hacer',
          assignee: 'Juan',
          epic: 'Nueva funcionalidad de notificaciones',
          createdAt: '2021-01-01',
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Description 2',
          status: 'por-hacer',
          assignee: 'María',
          epic: 'Campaña de marketing de navidad',
          createdAt: '2021-01-02',
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'En progreso',
      tasks: [
        {
          id: '3',
          title: 'Task 3',
          description: 'Description 3',
          status: 'en-progreso',
          assignee: 'Carlos',
          epic: 'Diseño de la nueva landing page',
          createdAt: '2021-01-03',
        },
      ],
    },
    {
      id: 'done',
      title: 'Completado',
      tasks: [],
    },
  ]);

  // Estado para controlar qué columna está en modo edición
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Si no hay destino o el destino es el mismo que el origen y el índice es el mismo, no hacemos nada
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Crear una copia profunda del estado actual
    const newColumns = JSON.parse(JSON.stringify(columns));

    // Encontrar las columnas de origen y destino
    const sourceColumn = newColumns.find((col: KanbanColumn) => col.id === source.droppableId);
    const destColumn = newColumns.find((col: KanbanColumn) => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Obtener la tarea que se está moviendo
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    // Insertar la tarea en la columna de destino
    destColumn.tasks.splice(destination.index, 0, movedTask);

    // Actualizar el estado
    setColumns(newColumns);
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
    <div className="flex gap-4 h-full overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map(column => (
          <div key={column.id} className="flex-shrink-0 bg-background border rounded-lg w-[350px] min-h-[500px] flex flex-col">
            {/* Header de la columna */}
            <div className="p-4 border-b">
              <h2 className="font-semibold text-lg text-foreground">{column.title}</h2>
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
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn('transition-all', snapshot.isDragging && 'rotate-[2deg] scale-105')}
                          >
                            <TaskCard
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
  );
};
