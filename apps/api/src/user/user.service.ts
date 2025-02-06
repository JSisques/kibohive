import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserSkillInput,
  UpdateUserSkillInput,
} from './dto/user-skill.dto';

@Injectable()
export class UserService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(UserService.name);
  }

  async getUsers(): Promise<User[]> {
    this.logger.log('Entering getUsers()');
    return this.prisma.user.findMany({
      include: { company: true, tasks: true, skills: true },
    });
  }

  async getUserById(id: string): Promise<User> {
    this.logger.log(`Entering getUserById(${id})`);
    return this.prisma.user.findUnique({
      where: { id },
      include: { company: true, tasks: true, skills: true },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`Entering getUserByEmail(${email})`);
    return this.prisma.user.findUnique({
      where: { email },
      include: { company: true, tasks: true, skills: true },
    });
  }

  async getUserByClerkId(clerkId: string): Promise<User> {
    this.logger.log(`Entering getUserByClerkId(${clerkId})`);
    return this.prisma.user.findUnique({
      where: { clerkId },
      include: { company: true, tasks: true, skills: true },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    this.logger.log(`Entering createUser(${user})`);
    return this.prisma.user.create({
      data: user,
      include: { company: true, tasks: true },
    });
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    this.logger.log(`Entering updateUser(${id}, ${user})`);
    return this.prisma.user.update({
      where: { id },
      data: user,
      include: { company: true, tasks: true },
    });
  }

  async deleteUser(id: string): Promise<User> {
    this.logger.log(`Entering deleteUser(${id})`);
    return this.prisma.user.delete({
      where: { id },
      include: { company: true, tasks: true },
    });
  }

  async addUserSkill(userId: string, skill: CreateUserSkillInput) {
    this.logger.log(
      `Entering addUserSkill(${userId}, ${JSON.stringify(skill)})`,
    );
    return this.prisma.userSkill.create({
      data: {
        ...skill,
        userId,
      },
    });
  }

  async updateUserSkill(
    userId: string,
    skillId: string,
    skill: UpdateUserSkillInput,
  ) {
    this.logger.log(
      `Entering updateUserSkill(${userId}, ${skillId}, ${JSON.stringify(skill)})`,
    );
    return this.prisma.userSkill.update({
      where: {
        id: skillId,
        userId,
      },
      data: skill,
    });
  }

  async deleteUserSkill(userId: string, skillId: string) {
    this.logger.log(`Entering deleteUserSkill(${userId}, ${skillId})`);
    return this.prisma.userSkill.delete({
      where: {
        id: skillId,
        userId,
      },
    });
  }

  async getUserSkills(userId: string) {
    this.logger.log(`Entering getUserSkills(${userId})`);
    return this.prisma.userSkill.findMany({
      where: {
        userId,
      },
    });
  }
}
