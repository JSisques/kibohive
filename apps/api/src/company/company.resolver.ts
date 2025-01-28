import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompanyDto } from './dto/company.dto';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Resolver()
export class CompanyResolver {
  private readonly logger;
  constructor(private readonly companyService: CompanyService) {
    this.logger = new Logger(CompanyResolver.name);
  }

  @Query(() => [CompanyDto])
  async getCompanies() {
    return this.companyService.getCompanies();
  }

  @Query(() => CompanyDto)
  async getCompanyById(@Args('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Mutation(() => CompanyDto)
  async createCompany(@Args('input') input: CreateCompanyDto) {
    return this.companyService.createCompany(input);
  }

  @Mutation(() => CompanyDto)
  async updateCompany(
    @Args('id') id: string,
    @Args('input') input: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompany(id, input);
  }

  @Mutation(() => CompanyDto)
  async deleteCompany(@Args('id') id: string) {
    return this.companyService.deleteCompany(id);
  }
}
