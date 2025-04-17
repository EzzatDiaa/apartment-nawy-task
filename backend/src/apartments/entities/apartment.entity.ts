import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unitName: string;

  @Column()
  unitNumber: string;

  @Column()
  project: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  bedrooms: number;

  @Column('int')
  bathrooms: number;

  @Column('decimal', { precision: 8, scale: 2 })
  area: number;

  @Column({ type: 'simple-array', default: [] })
  amenities: string[];

  @Column({ default: false })
  featured: boolean;

  @Column({ type: 'simple-array', default: [] })
  images: string[];

  @Column({ type: 'json', nullable: true })
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
