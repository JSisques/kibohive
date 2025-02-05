import { SignIn, SignedOut, UserButton, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4">
          <h1 className="text-4xl font-bold text-center">Bienvenido a KiboHive</h1>
          <p className="text-xl text-muted-foreground text-center max-w-lg">
            Optimiza el rendimiento de tu equipo con IA: desglose automático de tareas, asignación inteligente y análisis predictivo
          </p>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Panel Principal</h1>
              <p className="text-muted-foreground">Resumen de actividad y métricas clave</p>
            </div>
            <UserButton />
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">+3 desde ayer</p>
                  <Badge variant="secondary" className="text-xs">
                    ↑ 12%
                  </Badge>
                </div>
                <Progress value={45} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">+8 esta semana</p>
                  <Badge variant="secondary" className="text-xs">
                    ↑ 23%
                  </Badge>
                </div>
                <Progress value={78} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">+2 este mes</p>
                  <Badge variant="secondary" className="text-xs">
                    ↑ 15%
                  </Badge>
                </div>
                <div className="flex -space-x-2 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Avatar key={i} className="border-2 border-background h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-muted-foreground">-2 desde ayer</p>
                  <Badge variant="secondary" className="text-xs">
                    ↓ 40%
                  </Badge>
                </div>
                <Progress value={15} className="mt-3" />
              </CardContent>
            </Card>
          </div>

          {/* Épicas y Actividad */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Épicas Recientes</CardTitle>
                <CardDescription>Últimas épicas creadas o actualizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Rediseño de Dashboard',
                      description: 'Actualización del diseño principal',
                      status: 'En Progreso',
                      progress: 65,
                    },
                    {
                      title: 'Integración de IA',
                      description: 'Implementación de nuevos modelos',
                      status: 'Planificación',
                      progress: 25,
                    },
                    {
                      title: 'Optimización de Rendimiento',
                      description: 'Mejoras en la velocidad de carga',
                      status: 'En Revisión',
                      progress: 90,
                    },
                  ].map((epic, i) => (
                    <Link href={`/epics/${i + 1}`} key={i} className="block">
                      <div className="flex items-center space-x-4 p-4 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex-1">
                          <h3 className="font-medium">{epic.title}</h3>
                          <p className="text-sm text-muted-foreground">{epic.description}</p>
                          <Progress value={epic.progress} className="mt-2" />
                        </div>
                        <Badge>{epic.status}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones del equipo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        user: 'Juan Pérez',
                        action: 'completó la tarea',
                        task: 'Implementar autenticación',
                        time: 'Hace 2 horas',
                      },
                      {
                        user: 'María García',
                        action: 'creó una nueva épica',
                        task: 'Rediseño de la API',
                        time: 'Hace 3 horas',
                      },
                      {
                        user: 'Carlos Ruiz',
                        action: 'comentó en',
                        task: 'Optimización de consultas',
                        time: 'Hace 4 horas',
                      },
                      {
                        user: 'Ana Martínez',
                        action: 'asignó una tarea a',
                        task: 'Luis Rodríguez',
                        time: 'Hace 5 horas',
                      },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`} />
                          <AvatarFallback>{activity.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                            <span className="font-medium">{activity.task}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Vencimientos</CardTitle>
                  <CardDescription>Tareas que requieren atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Revisión de código',
                        dueDate: 'Mañana',
                        priority: 'Alta',
                      },
                      {
                        title: 'Testing de integración',
                        dueDate: 'En 2 días',
                        priority: 'Media',
                      },
                      {
                        title: 'Documentación API',
                        dueDate: 'En 3 días',
                        priority: 'Baja',
                      },
                    ].map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-2 hover:bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Vence: {task.dueDate}</p>
                        </div>
                        <Badge variant={task.priority === 'Alta' ? 'destructive' : task.priority === 'Media' ? 'default' : 'secondary'}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
