'use client';

import { GET_TASKS } from '@/lib/graphql';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User2, Clock, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
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
  const [searchQuery, setSearchQuery] = useState('');

  if (error) return <div>Error: {error.message}</div>;

  const filteredTasks = data?.getTasks.filter(
    (task: Task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.epic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Tareas</h1>
            <p className="text-muted-foreground">Gestiona y visualiza todas las tareas del proyecto</p>
          </div>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            {data?.getTasks.length || 0} tareas
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título, descripción, épica o asignado..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredTasks?.map((task: Task) => (
              <Link href={`/tasks/${task.id}`} key={task.id} className="block">
                <div className="group border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-card hover:border-primary/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{task.title}</h3>
                            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                        </div>
                        <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {task.epic.title}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <time>{format(new Date(task.createdAt), 'PPP', { locale: es })}</time>
                        </div>
                        {task.assignedTo && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User2 className="h-4 w-4" />
                            <span>{task.assignedTo.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
