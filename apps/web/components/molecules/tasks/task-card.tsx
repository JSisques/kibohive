'use client';

import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  epic: string;
  tags?: string[];
  createdAt: string;
}

const STATUS_INDICATOR_COLORS = {
  'por-hacer': 'bg-yellow-500',
  'en-progreso': 'bg-blue-500',
  completado: 'bg-emerald-500',
};

const MOCK_USERS = {
  '1': {
    name: 'Juan Pérez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  },
  '2': {
    name: 'María García',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  },
  '3': {
    name: 'Carlos López',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  },
};

const TaskCard = ({ title, description, status, assignee, epic, tags, createdAt }: TaskCardProps) => {
  const user = MOCK_USERS[assignee as keyof typeof MOCK_USERS];
  const date = new Date(createdAt);

  return (
    <Card className="group hover:shadow-md transition-all">
      <CardContent className="p-4 space-y-4">
        {/* Epic */}
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2 h-2 rounded-full', STATUS_INDICATOR_COLORS[status as keyof typeof STATUS_INDICATOR_COLORS])} />
          <span className="text-xs font-medium text-muted-foreground truncate max-w-[280px]">{epic}</span>
        </div>

        {/* Título y Descripción */}
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base leading-tight">{title}</h3>
          {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-secondary/50 text-secondary-foreground/80">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer: Usuario y Fecha */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{user?.name}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{format(date, 'dd MMM yyyy', { locale: es })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
