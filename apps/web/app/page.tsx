import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';

const MOCK_TEAMS = [
  {
    id: '1',
    name: 'Equipo Frontend',
    tasksCompleted: 15,
    totalTasks: 20,
    members: [
      { name: 'Juan P.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan' },
      { name: 'María G.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
    ],
    progress: 75,
  },
  {
    id: '2',
    name: 'Equipo Backend',
    tasksCompleted: 8,
    totalTasks: 12,
    members: [
      { name: 'Carlos L.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
      { name: 'Ana R.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
    ],
    progress: 66,
  },
  {
    id: '3',
    name: 'Equipo Diseño',
    tasksCompleted: 5,
    totalTasks: 8,
    members: [{ name: 'Pedro S.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro' }],
    progress: 62,
  },
];

const PRIORITY_TASKS = [
  {
    id: '1',
    title: 'Implementar autenticación',
    status: 'en-progreso',
    dueDate: '2024-03-20',
    team: 'Equipo Backend',
  },
  {
    id: '2',
    title: 'Diseñar nueva landing',
    status: 'por-hacer',
    dueDate: '2024-03-22',
    team: 'Equipo Diseño',
  },
  {
    id: '3',
    title: 'Optimizar rendimiento',
    status: 'en-progreso',
    dueDate: '2024-03-21',
    team: 'Equipo Frontend',
  },
];

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Resumen de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tareas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">+2 desde ayer</p>
              <Badge variant="secondary" className="text-xs">
                ↑ 8%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">+1 desde ayer</p>
              <Badge variant="secondary" className="text-xs">
                ↑ 4%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">+3 desde ayer</p>
              <Badge variant="secondary" className="text-xs">
                ↑ 12%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipos Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center space-x-2">
              <p className="text-xs text-muted-foreground">+1 desde la semana pasada</p>
              <Badge variant="secondary" className="text-xs">
                ↑ 20%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progreso de Equipos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_TEAMS.map(team => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle className="text-lg">{team.name}</CardTitle>
              <CardDescription>
                {team.tasksCompleted} de {team.totalTasks} tareas completadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={team.progress} className="h-2" />
                <div className="flex -space-x-2">
                  {team.members.map((member, i) => (
                    <Avatar key={i} className="border-2 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tareas Prioritarias */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas Prioritarias</CardTitle>
          <CardDescription>Tareas que requieren atención inmediata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {PRIORITY_TASKS.map(task => (
              <div key={task.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.team}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={task.status === 'en-progreso' ? 'secondary' : 'outline'}>{task.status}</Badge>
                  <span className="text-sm text-muted-foreground">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
