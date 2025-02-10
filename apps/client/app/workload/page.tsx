'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Datos de ejemplo - En producción esto vendría de una API
const teamMembers = [
  {
    id: 1,
    name: 'Ana García',
    role: 'Frontend Developer',
    workload: 75,
    avatar: '/avatars/ana.jpg',
    tasks: 8,
    capacity: 10,
  },
  // ... más miembros
];

const WorkloadPage = () => {
  const [timeframe, setTimeframe] = React.useState('week');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Distribución de Carga de Trabajo</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Esta semana</SelectItem>
            <SelectItem value="month">Este mes</SelectItem>
            <SelectItem value="quarter">Este trimestre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <TooltipProvider key={member.id}>
            <Tooltip>
              <TooltipTrigger>
                <Card className="p-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carga de trabajo</span>
                      <span>{member.workload}%</span>
                    </div>
                    <Progress
                      value={member.workload}
                      className={`${member.workload > 90 ? 'bg-red-200' : member.workload > 75 ? 'bg-yellow-200' : 'bg-green-200'}`}
                    />
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tareas activas: {member.tasks}</span>
                    <span>Capacidad: {member.capacity}</span>
                  </div>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Capacidad disponible: {member.capacity - member.tasks} tareas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="mt-6">
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Resumen del equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{teamMembers.filter(m => m.workload <= 75).length}</p>
              <p className="text-sm text-gray-500">Carga óptima</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{teamMembers.filter(m => m.workload > 75 && m.workload <= 90).length}</p>
              <p className="text-sm text-gray-500">Carga alta</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{teamMembers.filter(m => m.workload > 90).length}</p>
              <p className="text-sm text-gray-500">Sobrecarga</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkloadPage;
