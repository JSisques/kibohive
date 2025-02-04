import { Module } from '@nestjs/common';
import { EpicResolver } from './epic.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EpicService } from './epic.service';
import { IAModule } from 'src/ia/ia.module';
import { TaskModule } from 'src/task/task.module';
import { CompanyModule } from 'src/company/company.module';
@Module({
  imports: [PrismaModule, IAModule, TaskModule, CompanyModule],
  providers: [EpicService, EpicResolver],
  exports: [EpicService],
})
export class EpicModule {}
