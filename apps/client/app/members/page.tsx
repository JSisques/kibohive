'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@apollo/client';
import { GET_COMPANY_BY_CLERK_ID } from '@/lib/graphql/company/queries';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, Mail, UserCircle } from 'lucide-react';

interface Member {
  id: string;
  email: string;
}

const MembersPage = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useQuery(GET_COMPANY_BY_CLERK_ID, {
    variables: {
      clerkId: user?.organizationMemberships[0].organization.id,
    },
  });

  if (error) return <div>Error: {error.message}</div>;

  const filteredMembers = data?.getCompanyByClerkId.members.filter((member: Member) =>
    member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-medium">Miembros</h1>
          <p className="text-sm text-muted-foreground">Gestiona los miembros de tu organización</p>
        </div>
        {!loading && <p className="text-sm text-muted-foreground">{data?.getCompanyByClerkId.members.length} miembros</p>}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar miembros por email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredMembers.map((member: Member) => (
            <div key={member.id} className="p-6 bg-background hover:bg-muted/50 border border-border rounded-lg transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{member.email}</span>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>Email verificado</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">Miembro</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersPage;
