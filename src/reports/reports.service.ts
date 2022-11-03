import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetReportDto } from './dtos/get-report.dto';
import { Report } from './models/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

  async findAll(): Promise<Report[]> {
    return this.repository
      .createQueryBuilder('report')
      .leftJoinAndSelect(`${Report.ENTITY_ALIAS}.user`, 'u')
      .getRawMany();
  }

  async findById(id: string): Promise<GetReportDto> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, createReportDto: CreateReportDto): Promise<Report> {
    const report = await this.repository.findOneBy({ id });

    const toSave = this.repository.create({
      ...report,
      ...createReportDto,
    });

    return this.repository.save(toSave);
  }

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const toSave = this.repository.create({
      ...createReportDto,
    });
    return this.repository.save(toSave);
  }
}
