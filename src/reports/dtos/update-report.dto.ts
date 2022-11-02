import { IsNotEmpty } from 'class-validator';

export class UpdateReportDto {
  @IsNotEmpty({
    message: 'Informe alguma descrição',
  })
  description: string;

  @IsNotEmpty({
    message: 'Informe uma identificação',
  })
  identification: string;

  @IsNotEmpty({
    message: 'Informe um usúario',
  })
  userId: string;
}
