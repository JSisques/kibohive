import { Module } from '@nestjs/common';
import { EpicResolver } from './epic.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EpicService } from './epic.service';
import { IAModule } from 'src/ia/ia.module';

@Module({
  imports: [PrismaModule, IAModule],
  providers: [EpicService, EpicResolver],
  exports: [EpicService],
})
export class EpicModule {}
