import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(AuthService.name);
  }

  async signUp(input: SignUpDto): Promise<User> {
    this.logger.log(`Entering signUp(${input.email})`);

    // Crear la compañía primero
    const company = await this.prisma.company.create({
      data: {
        name: input.companyName,
        subdomain: input.subdomain,
      },
    });

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Crear el usuario con rol de OWNER
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
        companyId: company.id,
      },
    });

    // Crear un equipo por defecto
    const team = await this.prisma.team.create({
      data: {
        name: 'Default Team',
        description: 'Default team created on company registration',
        companyId: company.id,
      },
    });

    // Asignar al usuario como OWNER del equipo
    await this.prisma.teamMember.create({
      data: {
        userId: user.id,
        teamId: team.id,
        role: 'OWNER',
      },
    });

    return user;
  }

  async signIn(input: SignInDto): Promise<User> {
    this.logger.log(`Entering signIn(${input.email})`);

    // Buscar la compañía por subdominio
    const company = await this.prisma.company.findUnique({
      where: { subdomain: input.subdomain },
    });

    if (!company) {
      throw new UnauthorizedException('Company not found');
    }

    // Buscar el usuario por email y compañía
    const user = await this.prisma.user.findFirst({
      where: {
        email: input.email,
        companyId: company.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
