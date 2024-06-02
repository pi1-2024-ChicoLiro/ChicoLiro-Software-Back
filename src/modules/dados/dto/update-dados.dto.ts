import { PartialType } from '@nestjs/mapped-types';
import { CreateDadosDto } from './create-dados.dto';

export class UpdateDadosDto extends PartialType(CreateDadosDto) {}
