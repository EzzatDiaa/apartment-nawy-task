import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
  IsBoolean,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';


class LocationDto {
  @IsNumber()
  latiude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  address: string;
}

export class CreateApartmentDto {
  @IsString()
  @IsNotEmpty()
  unitName: string;

  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  bedrooms: number;

  @IsNumber()
  @Min(0)
  bathrooms: number;

  @IsNumber()
  @Min(0)
  area: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  amenities: string[];

  @IsBoolean()
  @IsOptional()
  featured: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}
