import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

interface JwtPayload {
  sub: string;
  email: string;
  companyId: string;
}

@Injectable()
export class AuthService {
  private readonly logger;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async isSubdomainAvailable(subdomain: string): Promise<boolean> {
    this.logger.log(`Checking subdomain availability: ${subdomain}`);
    const existingCompany = await this.prisma.company.findUnique({
      where: { subdomain },
    });
    return !existingCompany;
  }

  async signUp(input: SignUpDto): Promise<{ user: User; accessToken: string }> {
    this.logger.log(`Entering signUp(${input.email})`);

    let company;

    if (input.isNewCompany) {
      // Crear la compañía si es un nuevo registro
      company = await this.prisma.company.create({
        data: {
          name: input.companyName,
          subdomain: input.subdomain,
        },
      });
    } else {
      // Buscar la compañía existente por subdominio
      company = await this.prisma.company.findUnique({
        where: {
          subdomain: input.subdomain,
        },
      });

      if (!company) {
        throw new Error('La empresa no existe');
      }
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Crear el usuario con el rol apropiado
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
        companyId: company.id,
      },
    });

    if (input.isNewCompany) {
      // Crear un equipo por defecto solo si es una nueva compañía
      const team = await this.prisma.team.create({
        data: {
          name: 'Default Team',
          description: 'Default team created on company registration',
          companyId: company.id,
        },
      });

      // Asignar al usuario como OWNER del equipo si es nueva compañía
      await this.prisma.teamMember.create({
        data: {
          userId: user.id,
          teamId: team.id,
          role: 'OWNER',
        },
      });
    } else {
      // Si no es nueva compañía, buscar el equipo por defecto y añadir como MEMBER
      const defaultTeam = await this.prisma.team.findFirst({
        where: {
          companyId: company.id,
        },
      });

      if (defaultTeam) {
        await this.prisma.teamMember.create({
          data: {
            userId: user.id,
            teamId: defaultTeam.id,
            role: 'MEMBER',
          },
        });
      }
    }

    // Generar el token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user,
      accessToken,
    };
  }

  async signIn(input: SignInDto): Promise<{ user: User; accessToken: string }> {
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

    // Generar el token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      companyId: user.companyId,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      user,
      accessToken,
    };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      return user;
    } catch (error) {
      this.logger.error(`Error validating token: ${error.message}`);
      return null;
    }
  }
}
