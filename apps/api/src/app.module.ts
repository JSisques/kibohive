import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpicModule } from './epic/epic.module';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { IAModule } from './ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      playground: process.env.NODE_ENV === 'production' ? false : true,
    }),
    EpicModule,
    TaskModule,
    PrismaModule,
    UserModule,
    CompanyModule,
    IAModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
