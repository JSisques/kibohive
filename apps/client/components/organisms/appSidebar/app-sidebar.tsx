'use client';

import * as React from 'react';
import {
  Brain,
  Home,
  Users,
  Kanban,
  Calendar,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Layers,
  ListTodo,
  UserCircle,
  LineChart,
  Building2,
  Table,
  SquareChartGantt,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { SignInButton, SignOutButton, useAuth, useOrganization, UserButton, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AppSidebar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { organization } = useOrganization();
  const { user } = useUser();

  if (!isSignedIn) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-fit" onClick={() => router.push('/profile')}>
              <Avatar>
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback>
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{`${user?.firstName} ${user?.lastName}`}</span>
                <span>{user?.emailAddresses[0].emailAddress}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Vista General */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/')}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Panel Principal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Gestión de Épicas y Proyectos */}
        <SidebarGroup>
          <SidebarGroupLabel>Gestión de Proyectos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/epics')}>
                  <Layers className="mr-2 h-4 w-4" />
                  <span>Épicas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/tasks')}>
                  <ListTodo className="mr-2 h-4 w-4" />
                  <span>Tareas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Vistas de Trabajo */}
        <SidebarGroup>
          <SidebarGroupLabel>Vistas de Trabajo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/kanban')}>
                  <Kanban className="mr-2 h-4 w-4" />
                  <span>Tablero Kanban</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/table')}>
                  <Table className="mr-2 h-4 w-4" />
                  <span>Tabla</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/calendar')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendario</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/timeline')}>
                  <SquareChartGantt className="mr-2 h-4 w-4" />
                  <span>Cronograma</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Gestión de Equipos */}
        <SidebarGroup>
          <SidebarGroupLabel>Equipos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/teams')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Equipos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/members')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Miembros</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/workload')}>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>Carga de Trabajo</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Análisis y Métricas */}
        <SidebarGroup>
          <SidebarGroupLabel>Análisis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/metrics')}>
                  <LineChart className="mr-2 h-4 w-4" />
                  <span>Métricas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => router.push('/help')}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Ayuda</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => {
                    signOut({
                      callbackUrl: '/login',
                    });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <SignOutButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
