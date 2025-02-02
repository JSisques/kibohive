import { registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Estado de la tarea',
});
