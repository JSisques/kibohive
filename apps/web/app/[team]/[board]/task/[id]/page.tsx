'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskStatus } from '@prisma/client';
import { CalendarDays, ArrowLeft, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { CommentSection, type Comment } from '@/components/organisms/comment-section';

const TaskPage = () => {
  const { id, team } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState({
    id: id as string,
    taskId: 'TASK-123',
    title: 'Implement new user onboarding flow',
    description: 'Create a seamless onboarding experience for new users, including email verification and profile setup.',
    status: TaskStatus.IN_PROGRESS,
    epic: 'User Experience Improvements',
    assignee: {
      name: 'Alex Johnson',
      avatar: '',
    },
    createdAt: '2023-06-15',
    tags: ['UX', 'Frontend', 'High Priority'],
  });

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: "Great progress on this task! Let's make sure we test thoroughly before moving to QA.",
      author: {
        name: 'Jane Doe',
        avatar: '',
      },
      createdAt: '2023-06-16T16:30:00',
    },
    {
      id: '2',
      content: "I've added some notes on the design specifications in Figma. Please review when you have a chance.",
      author: {
        name: 'John Smith',
        avatar: '',
      },
      createdAt: '2023-06-17T11:15:00',
    },
  ]);

  const handleTaskUpdate = (field: string, value: any) => {
    setTask(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddComment = (content: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        name: 'Usuario Actual',
        avatar: '',
      },
      createdAt: new Date().toISOString(),
    };

    setComments(prev => [...prev, comment]);
  };

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <Link href={`/${team}`} className="flex items-center gap-1 hover:text-foreground text-sm text-muted-foreground">
          <ArrowLeft className="w-4 h-4" />
          Volver a tareas
        </Link>
        <Button variant={isEditing ? 'default' : 'outline'} onClick={() => setIsEditing(!isEditing)}>
          <Pencil className="w-4 h-4 mr-2" />
          {isEditing ? 'Guardar cambios' : 'Editar tarea'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Task ID and Status */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">{task.taskId}</div>
            {isEditing ? (
              <Select value={task.status} onValueChange={value => handleTaskUpdate('status', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TaskStatus.PENDING}>Pendiente</SelectItem>
                  <SelectItem value={TaskStatus.IN_PROGRESS}>En Progreso</SelectItem>
                  <SelectItem value={TaskStatus.COMPLETED}>Completado</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                {task.status}
              </Badge>
            )}
          </div>

          {/* Title */}
          {isEditing ? (
            <Input
              value={task.title}
              onChange={e => handleTaskUpdate('title', e.target.value)}
              className="text-2xl font-semibold mb-6 h-auto py-1 px-2"
            />
          ) : (
            <h1 className="text-2xl font-semibold mb-6">{task.title}</h1>
          )}

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-base font-medium mb-2">Description</h2>
            {isEditing ? (
              <Textarea
                value={task.description}
                onChange={e => handleTaskUpdate('description', e.target.value)}
                className="min-h-[100px] text-muted-foreground"
                placeholder="Add a description..."
              />
            ) : (
              <p className="text-muted-foreground">{task.description}</p>
            )}
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-y-4 mb-6">
            <div>
              <div className="text-sm font-medium mb-1">Epic</div>
              {isEditing ? (
                <Input value={task.epic} onChange={e => handleTaskUpdate('epic', e.target.value)} className="h-8" />
              ) : (
                <div className="text-muted-foreground">{task.epic}</div>
              )}
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Assigned To</div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <Input
                    value={task.assignee.name}
                    onChange={e => handleTaskUpdate('assignee', { ...task.assignee, name: e.target.value })}
                    className="h-8"
                  />
                ) : (
                  <span className="text-muted-foreground">{task.assignee.name}</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Created</div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {format(new Date(task.createdAt), 'dd/MM/yyyy')}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Tags</div>
              <div className="flex gap-1">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Comments */}
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            currentUser={{
              name: 'Usuario Actual',
              avatar: '',
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskPage;
