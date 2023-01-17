import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetReportDto } from './dtos/get-report.dto';
import { ReturnReportDto } from './dtos/return-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Report } from './models/report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllReport(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneReport(@Param('id') id: string): Promise<GetReportDto> {
    return this.reportsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReturnReportDto> {
    await this.reportsService.update(id, updateReportDto);
    return {
      message: 'Laudo atualizado com sucesso',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReport(
    @Body(ValidationPipe) createReportDto: CreateReportDto,
  ): Promise<ReturnReportDto> {
    await this.reportsService.create(createReportDto);
    return {
      message: 'Laudo cadastrado com sucesso',
    };
  }
}
