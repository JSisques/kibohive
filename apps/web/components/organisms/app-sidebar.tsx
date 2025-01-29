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
import { useCompany } from '@/context/company-context';
import { Team } from '@/types';
import { Select, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const TaskSidebar = () => {
  const router = useRouter();
  const { currentCompany } = useCompany();
  const { currentTeam, setCurrentTeam } = useTeam();
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(() => {
    return currentCompany?.teams.find(team => team.id === currentTeam?.id) || null;
  });

  React.useEffect(() => {
    if (currentTeam) {
      setSelectedTeam(currentCompany?.teams.find(team => team.id === currentTeam.id) || null);
    }
  }, [currentTeam, currentCompany?.teams]);

  const handleTeamChange = (teamId: string) => {
    const team = currentCompany?.teams.find(t => t.id === teamId);
    if (!team) return;
    setSelectedTeam(team);
    setCurrentTeam(team);
    router.push(`/${team.name.replace(/\s+/g, '-').toLowerCase()}/dashboard`);
  };

  const handleNavigation = (path: string) => {
    if (!currentTeam) return;
    router.push(`/${currentTeam.name.replace(/\s+/g, '-').toLowerCase()}${path}`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => router.push('/')}>
              <div className="flex items-center">
                <Brain className="mr-2 h-6 w-6" />
                <span className="font-bold text-xl">{currentCompany?.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Selector de Equipo */}
        <SidebarGroup className="mb-4 p-0">
          <SidebarGroupContent>
            <Select value={currentTeam?.id || undefined} onValueChange={handleTeamChange}>
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <SelectValue placeholder="Selecciona un equipo">{selectedTeam?.name || 'Selecciona un equipo'}</SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tus Equipos</SelectLabel>
                  {currentCompany?.teams.map(team => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        {/* Vista General */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/dashboard')}>
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
                <SidebarMenuButton onClick={() => handleNavigation('/epics')}>
                  <Layers className="mr-2 h-4 w-4" />
                  <span>Épicas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/tasks')}>
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
                <SidebarMenuButton onClick={() => handleNavigation('/kanban')}>
                  <Kanban className="mr-2 h-4 w-4" />
                  <span>Tablero Kanban</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/table')}>
                  <Table className="mr-2 h-4 w-4" />
                  <span>Tabla</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/calendar')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Calendario</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/timeline')}>
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
                <SidebarMenuButton onClick={() => handleNavigation('/teams')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Equipos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/members')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Miembros</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => handleNavigation('/workload')}>
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
                <SidebarMenuButton onClick={() => handleNavigation('/metrics')}>
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
                    /* Aquí iría la lógica de logout */
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
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
