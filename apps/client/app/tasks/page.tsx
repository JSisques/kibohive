'use client';

import { GET_TASKS } from '@/lib/graphql';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

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
    <div className="w-full max-w-7xl mx-auto px-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-[200px] w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks?.map((task: Task) => (
              <Card key={task.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold line-clamp-1">{task.title}</h3>
                    <Badge variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {task.epic.title}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{task.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time>{new Date(task.createdAt).toLocaleDateString()}</time>
                  </div>
                  {task.assignedTo && (
                    <div className="flex items-center gap-2">
                      <User2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{task.assignedTo.name}</span>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
