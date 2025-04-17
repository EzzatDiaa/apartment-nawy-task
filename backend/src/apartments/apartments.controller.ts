import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  Injectable,
  Search,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { Apartment } from './entities/apartment.entity';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createApartmentDto: CreateApartmentDto,
  ): Promise<Apartment> {
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('unitName') unitName?: string,
    @Query('unitNumber') unitNumber?: string,
    @Query('project') project?: string,
  ): Promise<Apartment[]> {
    if (search || unitName || unitNumber || project) {
      return this.apartmentsService.search({
        search,
        unitName,
        unitNumber,
        project,
      });
    }
    return this.apartmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Apartment> {
    return this.apartmentsService.findOne(+id);
  }
}
