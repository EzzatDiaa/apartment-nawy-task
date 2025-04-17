import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentsRepository: Repository<Apartment>,
  ) {}
  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    const apartment = this.apartmentsRepository.create(createApartmentDto);
    return this.apartmentsRepository.save(apartment);
  }

  async findAll(): Promise<Apartment[]> {
    return this.apartmentsRepository.find();
  }

  async findOne(id: number): Promise<Apartment> {
    const apartment = await this.apartmentsRepository.findOne({
      where: { id },
    });
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${id} not found`);
    }
    return apartment;
  }

  async search(params: {
    search?: string;
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }): Promise<Apartment[]> {
    const { search, unitName, unitNumber, project } = params;
    const where: FindOptionsWhere<Apartment> = {};

    if (search) {
      return this.apartmentsRepository.find({
        where: [
          { unitName: Like(`%${search}%`) },
          { unitNumber: Like(`%${search}%`) },
          { project: Like(`%${search}%`) },
        ],
      });
    }

    if (unitName) {
      where.unitName = Like(`%${unitName}%`);
    }

    if (unitNumber) {
      where.unitNumber = Like(`%${unitNumber}%`);
    }

    if (project) {
      where.project = Like(`%${project}%`);
    }

    return this.apartmentsRepository.find({ where });
  }
}
