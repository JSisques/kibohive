import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  epic: string;
  tags?: string[];
  createdAt: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'TODO':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'IN_PROGRESS':
      return 'bg-blue-500/10 text-blue-500';
    case 'DONE':
      return 'bg-green-500/10 text-green-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const KanbanCard = ({ title, description, status, assignee, epic, createdAt, tags }: KanbanCardProps) => {
  return (
    <Card className="p-3 hover:shadow-md transition-all bg-card border border-border/40 hover:border-border">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-sm text-foreground/90 line-clamp-2">{title}</h3>
        {assignee && (
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {assignee
                .split(' ')
                .map(word => word[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        )}
      </div>

      {/* Epic y Estado */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {epic && (
          <Badge variant="outline" className="text-[10px] h-4 font-normal">
            {epic}
          </Badge>
        )}
        <Badge variant="secondary" className={cn('text-[10px] h-4 font-normal', getStatusColor(status))}>
          {status === 'TODO' ? 'Por hacer' : status === 'IN_PROGRESS' ? 'En progreso' : 'Completado'}
        </Badge>
      </div>

      {/* Descripción */}
      {description && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>}

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-2 pt-2 border-t border-border/40">
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>{tags?.length || 0} etiquetas</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default KanbanCard;
