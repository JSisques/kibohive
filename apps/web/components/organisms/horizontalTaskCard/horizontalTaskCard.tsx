import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TaskCardProps {
  title: string;
  assignedTo: string;
  taskNumber: number;
}

function HorizontalTaskCard({ title, assignedTo, taskNumber }: TaskCardProps) {
  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="p-4 bg-muted rounded-lg flex items-center justify-between hover:bg-muted/80 transition-colors group">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`https://avatar.vercel.sh/${assignedTo}.png`} alt={assignedTo} />
          <AvatarFallback>{getInitials(assignedTo)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium group-hover:text-primary transition-colors">{title}</p>
          <p className="text-sm text-muted-foreground">{assignedTo}</p>
        </div>
      </div>
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700 shrink-0">Tarea {taskNumber}</span>
    </div>
  );
}

export default HorizontalTaskCard;
