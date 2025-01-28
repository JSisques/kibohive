import { Module } from '@nestjs/common';
import { EpicResolver } from './epic.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EpicService } from './epic.service';

@Module({
  imports: [PrismaModule],
  providers: [EpicService, EpicResolver],
  exports: [EpicService],
})
export class EpicModule {}
