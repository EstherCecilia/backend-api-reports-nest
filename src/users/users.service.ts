import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<GetUserDto[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<GetUserDto> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    const toSave = this.repository.create({
      ...user,
      ...createUserDto,
    });

    return this.repository.save(toSave);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const toSave = this.repository.create({
      ...createUserDto,
      status: true,
    });
    return this.repository.save(toSave);
  }
}
