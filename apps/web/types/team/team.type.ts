import { Task } from '../task/task.type';
import { Epic } from '../epic/epic.type';

export type Team = {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  epics: Epic[];
};
