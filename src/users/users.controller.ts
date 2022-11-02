import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { ReturnUserDto } from './dtos/return-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAllUser(): Promise<GetUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<GetUserDto> {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return {
      user,
      message: 'Usuario atualizado com sucesso',
    };
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      user,
      message: 'Usuario cadastrado com sucesso',
    };
  }
}
