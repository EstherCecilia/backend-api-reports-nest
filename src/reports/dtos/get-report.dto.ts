import { User } from 'src/users/models/user.entity';

export class GetReportDto {
  id: string;
  description: string;
  identification: string;
  user: User;
  createdAt: Date;
}
