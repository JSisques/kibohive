import { TeamMember } from './team-member';

export interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}
