import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdmin } from './dtos/create-admin.dto';
import { Admin } from './models/admin.entity';

@Injectable()
export class AdminsService {
  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async findByName(username: string): Promise<Admin> {
    return this.repository.findOneBy({
      username,
    });
  }

  async create(user: CreateAdmin): Promise<Admin> {
    const userToSave = this.repository.create({
      username: user.username,
      password: user.password,
    });

    return this.repository.save(userToSave);
  }
}
