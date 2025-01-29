import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsBoolean,
  IsUUID,
} from 'class-validator';

@ObjectType('SignUp')
@InputType('SignUpInput')
export class SignUpDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'El subdominio solo puede contener letras minúsculas, números y guiones',
  })
  @MinLength(3, { message: 'El subdominio debe tener al menos 3 caracteres' })
  subdomain: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isNewCompany: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'El nombre de la empresa debe tener al menos 3 caracteres',
  })
  companyName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'El nombre del equipo debe tener al menos 3 caracteres',
  })
  teamName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  teamDescription?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  selectedTeam?: string;
}
