'use client';

import { GET_TASKS } from '@/lib/graphql';
import { useQuery } from '@apollo/client';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  epic: {
    title: string;
  };
  assignedTo: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const TasksPage = () => {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Tareas</h1>
          <p className="text-sm text-muted-foreground">Descipcion de lo que hace esta página</p>
        </div>

        <p className="text-sm text-muted-foreground">{data?.getTasks.length} tareas</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {data?.getTasks.map((task: Task) => (
            <div key={task.id} className="p-6 bg-background hover:bg-muted/50 border border-border rounded-lg transition-colors cursor-pointer">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <time className="text-sm text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</time>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 rounded-full">{task.epic.title}</span>
                  {task.assignedTo && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Asignado a:</span>
                      <span className="text-xs font-medium">{task.assignedTo.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;
