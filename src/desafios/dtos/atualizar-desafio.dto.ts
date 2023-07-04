import { IsOptional } from 'class-validator';
import { DesafioStatus } from '../enums';

export class AtualizarDesafioDto {
  @IsOptional()
  //@IsDate()
  dataHoraDesafio: Date;

  @IsOptional()
  status: DesafioStatus;
}
