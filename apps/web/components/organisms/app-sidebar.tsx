'use client';

import * as React from 'react';
import {
  Brain,
  Home,
  Users,
  Kanban,
  Calendar,
  Target,
  Bot,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Layers,
  ListTodo,
  UserCircle,
  Briefcase,
  LineChart,
  GitPullRequest,
  ChevronDown,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTeam } from '@/context/team-context';

const TaskSidebar = () => {
  const [selectedTeam, setSelectedTeam] = React.useState({
    id: 'mi-equipo',
    name: 'Mi Equipo',
    icon: '🚀',
  });

  const { currentTeam, setCurrentTeam } = useTeam();

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center">
                <Brain className="mr-2 h-6 w-6" />
                <span className="font-bold text-xl">KiboHive</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Selector de Equipo */}
        <SidebarGroup className="mb-4 p-0">
          <SidebarGroupContent>
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full flex items-center justify-between p-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>{selectedTeam.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground py-1">Tus Equipos</div>
                  {[
                    { id: 'mi-equipo', name: 'Mi Equipo', icon: '🚀' },
                    { id: 'desarrollo', name: 'Equipo de Desarrollo', icon: '💻' },
                    { id: 'marketing', name: 'Equipo de Marketing', icon: '📢' },
                    { id: 'diseno', name: 'Equipo de Diseño', icon: '🎨' },
                  ].map(team => (
                    <button
                      key={team.id}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                      onClick={() => setSelectedTeam(team)}
                    >
                      <span>{team.icon}</span>
                      <span>{team.name}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        {/* Vista General */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/dashboard`}>
                    <Home className="mr-2 h-4 w-4" />
                    <span>Panel Principal</span>
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/epics`}>
                    <Layers className="mr-2 h-4 w-4" />
                    <span>Épicas</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/tasks`}>
                    <ListTodo className="mr-2 h-4 w-4" />
                    <span>Tareas</span>
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/kanban`}>
                    <Kanban className="mr-2 h-4 w-4" />
                    <span>Tablero Kanban</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/table`}>
                    <Table className="mr-2 h-4 w-4" />
                    <span>Tabla</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/calendar`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendario</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/timeline`}>
                    <SquareChartGantt className="mr-2 h-4 w-4" />
                    <span>Cronograma</span>
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/teams`}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Equipos</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/members`}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Miembros</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/workload`}>
                    <BarChart2 className="mr-2 h-4 w-4" />
                    <span>Carga de Trabajo</span>
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href={`/${currentTeam}/metrics`}>
                    <LineChart className="mr-2 h-4 w-4" />
                    <span>Métricas</span>
                  </a>
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
                <SidebarMenuButton asChild>
                  <a href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/help">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Ayuda</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default TaskSidebar;
