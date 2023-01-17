import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { CreateAdmin } from 'src/admins/dtos/create-admin.dto';
import { Admin } from '../admins/models/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(name: string, password: string): Promise<Admin> {
    const user = await this.adminsService.findByName(name);
    if (!user || !this.validatePassword(user, password)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async create(user: CreateAdmin): Promise<Admin> {
    if (user.confirmPassword != user.password) {
      throw new BadRequestException(
        'Password and confirm password are not equals',
      );
    }
    const salt = genSaltSync();
    const passwordHash = hashSync(user.password, salt);
    user.password = passwordHash;

    return this.adminsService.create(user);
  }

  private validatePassword(user: Admin, passwordInformed: string): boolean {
    return compareSync(passwordInformed, user.password);
  }

  async login(loginUser: any) {
    const user = await Admin.findOneBy({ username: loginUser.username });

    return {
      access_token: this.jwtService.sign(loginUser),
      auth: user,
    };
  }
}
