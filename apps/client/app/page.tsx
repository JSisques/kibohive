'use client';
import { SignIn, SignedOut, UserButton, SignedIn, useUser, useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_BY_CLERK_ID } from '@/lib/graphql/company/queries';

export default function Home() {
  const { organization } = useOrganization();

  const { data, loading, error } = useQuery(GET_COMPANY_BY_CLERK_ID, {
    variables: {
      clerkId: organization?.id,
    },
    skip: !organization?.id,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
          </div>

          {/* Métricas Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.getCompanyByClerkId.epics.reduce((acc: number, epic: any) => acc + epic.numberOfTasks, 0)}
                </div>
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
                <div className="text-2xl font-bold">
                  {data?.getCompanyByClerkId.epics.reduce((acc: number, epic: any) => acc + epic.tasksCompleted.length, 0)}
                </div>
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
                <div className="text-2xl font-bold">
                  {data?.getCompanyByClerkId.epics.reduce((acc: number, epic: any) => acc + epic.tasksPending.length, 0)}
                </div>
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
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Épicas Recientes</CardTitle>
                <CardDescription>Últimas épicas creadas o actualizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.getCompanyByClerkId.epics.slice(0, 5).map((epic: any) => (
                    <Link href={`/epics/${epic.id}`} key={epic.id} className="block">
                      <div className="flex items-center space-x-4 p-4 hover:bg-muted rounded-lg transition-colors">
                        <div className="flex-1">
                          <h3 className="font-medium">{epic.title}</h3>
                          <p className="text-sm text-muted-foreground">{epic.description}</p>
                          <Progress value={(epic.numberOfTaskCompleted / epic.numberOfTasks) * 100} className="mt-2" />
                        </div>
                        <Badge>
                          {epic.numberOfTaskCompleted} / {epic.numberOfTasks}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
