import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdmin {
  @IsNotEmpty({
    message: 'Informe o nome de usúario',
  })
  username: string;

  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  password: string;

  @MinLength(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  })
  confirmPassword: string;
}
