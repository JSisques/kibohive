'use client';

import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Mail, Check, X } from 'lucide-react';

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  joinedAt: string;
};

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'Administrador',
    status: 'activo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    joinedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    role: 'Miembro',
    status: 'activo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    joinedAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    role: 'Miembro',
    status: 'pendiente',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    joinedAt: '2024-01-03',
  },
];

const STATUS_COLORS = {
  activo: 'bg-green-100 text-green-800',
  pendiente: 'bg-yellow-100 text-yellow-800',
  inactivo: 'bg-red-100 text-red-800',
};

const ROLE_COLORS = {
  Administrador: 'bg-purple-100 text-purple-800',
  Miembro: 'bg-blue-100 text-blue-800',
};

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Miembro');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const filteredMembers = members.filter(
    member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInvite = () => {
    if (!inviteEmail) return;

    const newMember: Member = {
      id: (members.length + 1).toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pendiente',
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setMembers(prev => [...prev, newMember]);
    setInviteStatus('success');

    // Reset after 2 seconds
    setTimeout(() => {
      setInviteStatus('idle');
      setInviteEmail('');
      setShowInviteDialog(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Miembros del Equipo</h1>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invitar Miembro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invitar Nuevo Miembro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rol</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                >
                  <option value="Miembro">Miembro</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <Button onClick={handleInvite} className="w-full" disabled={!inviteEmail || inviteStatus !== 'idle'}>
                {inviteStatus === 'idle' && 'Enviar Invitación'}
                {inviteStatus === 'success' && <Check className="h-4 w-4" />}
                {inviteStatus === 'error' && <X className="h-4 w-4" />}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar miembros..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Miembro</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Unión</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map(member => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge className={ROLE_COLORS[member.role as keyof typeof ROLE_COLORS]}>{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[member.status as keyof typeof STATUS_COLORS]}>{member.status}</Badge>
                </TableCell>
                <TableCell>{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersPage;
