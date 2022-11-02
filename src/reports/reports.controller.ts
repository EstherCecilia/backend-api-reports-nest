import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetReportDto } from './dtos/get-report.dto';
import { ReturnReportDto } from './dtos/return-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Get()
  findAllReport(): Promise<GetReportDto[]> {
    return this.reportsService.findAll();
  }

  @Get(':id')
  findOneReport(@Param('id') id: string): Promise<GetReportDto> {
    return this.reportsService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReturnReportDto> {
    const report = await this.reportsService.update(id, updateReportDto);
    return {
      report,
      message: 'Laudo atualizado com sucesso',
    };
  }

  @Post()
  async createReport(
    @Body(ValidationPipe) createReportDto: CreateReportDto,
  ): Promise<ReturnReportDto> {
    const report = await this.reportsService.create(createReportDto);
    return {
      report,
      message: 'Laudo cadastrado com sucesso',
    };
  }
}
