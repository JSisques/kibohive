import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UserService.name);
  }

  async getUsers(): Promise<User[]> {
    this.logger.log('Entering getUsers()');
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    this.logger.log(`Entering getUserById(${id})`);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`Entering getUserByEmail(${email})`);
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log(`Entering createUser(${user})`);
    return this.prisma.user.create({ data: user });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    this.logger.log(`Entering updateUser(${id}, ${user})`);
    return this.prisma.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string): Promise<User> {
    this.logger.log(`Entering deleteUser(${id})`);
    return this.prisma.user.delete({ where: { id } });
  }
}
