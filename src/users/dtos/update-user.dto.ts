import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({
    message: 'Informe um endereço de email',
  })
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Informe o nome do usuário',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe um número de telefone',
  })
  cellphone: string;
}
