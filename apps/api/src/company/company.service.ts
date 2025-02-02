import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CompanyService.name);
  }

  async getCompanies() {
    return this.prisma.company.findMany({
      include: { epics: true, members: true },
    });
  }

  async getCompanyById(id: string) {
    return this.prisma.company.findUnique({
      where: { id },
      include: { epics: true, members: true },
    });
  }

  async getCompanyBySubdomain(subdomain: string) {
    return this.prisma.company.findUnique({
      where: { subdomain },
      include: { epics: true, members: true },
    });
  }

  async getCompanyByClerkId(clerkId: string) {
    return this.prisma.company.findUnique({
      where: { clerkId },
      include: { epics: true, members: true },
    });
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    return await this.prisma.company.create({
      data: createCompanyDto,
      include: { epics: true, members: true },
    });
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
      include: { epics: true, members: true },
    });
  }

  async deleteCompany(id: string) {
    return this.prisma.company.delete({
      where: { id },
      include: { epics: true, members: true },
    });
  }
}
