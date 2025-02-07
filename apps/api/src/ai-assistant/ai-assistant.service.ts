import { Injectable, Logger } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { IAService } from 'src/ia/ia.service';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class AiAssistantService {
  private readonly logger;

  constructor(
    private readonly iaService: IAService,
    private readonly companyService: CompanyService,
  ) {
    this.logger = new Logger(AiAssistantService.name);
  }

  // TODO: Revisar el prompt

  async executeUserQuery(input: CreateUserQueryDto): Promise<UserQueryDto> {
    this.logger.log(`Solicitud de respuesta: ${input}`);

    const company = await this.companyService.getCompanyByClerkId(
      input.clerkCompanyId,
    );

    const prompt = `
    Eres un asistente de IA que ayuda a los usuarios a gestionar sus tareas.
    Si el usuario te pide ayuda, debes responder con un mensaje de saludo y ofrecer tu ayuda.
    Si el usuario te pide ayuda con algo, debes responder con un mensaje de saludo y ofrecer tu ayuda.


    devuelvelo en un json con el siguiente formato:
    {
      "response": "string"
    }

    Aquí tienes la información de la empresa:
    ${JSON.stringify(company)}

    Aquí tienes la consulta del usuario:
    ${input.userQuery}
    `;

    const response = await this.iaService.executePrompt(prompt);
    const data = response.data as any;

    return { response: data.response };
  }
}
