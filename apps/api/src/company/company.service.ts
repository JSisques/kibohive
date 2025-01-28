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
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: string) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async deleteCompany(id: string) {
    return this.prisma.company.delete({ where: { id } });
  }
}
