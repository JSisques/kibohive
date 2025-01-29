import { User } from 'next-auth';
import { Team } from '../team/team.type';

export type Company = {
  id: string;
  name: string;
  subdomain: string;
  teams: Team[];
  users: User[];
};
