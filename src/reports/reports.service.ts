import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetReportDto } from './dtos/get-report.dto';
import { Report } from './models/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

  protected queryBuilder(): SelectQueryBuilder<Report> {
    return this.repository.createQueryBuilder('report');
  }

  async findAll(): Promise<Report[]> {
    return this.queryBuilder()
      .innerJoinAndSelect(`${Report.ENTITY_ALIAS}.user`, 'u')
      .getRawMany();
  }

  async findById(id: string): Promise<GetReportDto> {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, createReportDto: CreateReportDto): Promise<void> {
    await this.queryBuilder()
      .update()
      .set(createReportDto)
      .where({ id })
      .execute();
  }

  async create(createReportDto: CreateReportDto): Promise<void> {
    await this.queryBuilder()
      .insert()
      .into(Report)
      .values([createReportDto])
      .execute();
  }
}
