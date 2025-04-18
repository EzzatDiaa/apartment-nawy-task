import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Like,
  FindOptionsWhere,
  Between,
  MoreThanOrEqual,
} from 'typeorm';
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
    propertyType?: string;
    bedrooms?: string;
    priceMin?: string;
    priceMax?: string;
  }): Promise<Apartment[]> {
    const {
      search,
      unitName,
      unitNumber,
      project,
      propertyType,
      bedrooms,
      priceMin,
      priceMax,
    } = params;

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

    if (propertyType) {
      where.propertyType = propertyType;
    }

    if (bedrooms) {
      where.bedrooms = MoreThanOrEqual(parseInt(bedrooms, 10));
    }

    if (priceMin && priceMax) {
      where.price = Between(parseFloat(priceMin), parseFloat(priceMax));
    } else if (priceMin) {
      where.price = MoreThanOrEqual(parseFloat(priceMin));
    } else if (priceMax) {
      where.price = Between(0, parseFloat(priceMax));
    }

    return this.apartmentsRepository.find({ where });
  }
}
