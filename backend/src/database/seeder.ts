import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from '../apartments/entities/apartment.entity';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(Apartment)
    private apartmentsRepository: Repository<Apartment>,
  ) {}

  async seed() {
    const apartmentsCount = await this.apartmentsRepository.count();
    if (apartmentsCount > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }

    console.log('Seeding database...');

    const apartments = [
      // Luxury Villa - Featured
      {
        unitName: 'Sunset Villa',
        unitNumber: 'V001',
        project: 'Coastal Heights',
        description:
          'Luxurious beachfront villa with panoramic ocean views. This exquisite property features high ceilings, premium finishes, and direct beach access. The villa includes a private infinity pool, landscaped garden, and a spacious terrace perfect for entertaining.',
        price: 3500000,
        bedrooms: 5,
        bathrooms: 6,
        area: 450.75,
        propertyType: 'Villa',
        amenities: [
          'Private Pool',
          'Beachfront',
          'Smart Home System',
          'Private Garden',
          'Security System',
          'Wine Cellar',
          'Home Theater',
        ],
        featured: true,
        images: [],
        location: {
          latitude: 25.103,
          longitude: 55.174,
          address: '123 Coastal Drive, Palm Beach',
        },
      },

      // Modern Apartment - Featured
      {
        unitName: 'Urban Loft',
        unitNumber: 'A204',
        project: 'Downtown Residences',
        description:
          'Modern, well-designed apartment in the heart of downtown. This stylish unit offers an open floor plan with high-quality finishes, floor-to-ceiling windows, and a balcony overlooking the city skyline. Perfect for professionals who want to be close to business districts and entertainment venues.',
        price: 750000,
        bedrooms: 2,
        bathrooms: 2,
        area: 110.5,
        propertyType: 'Apartment',
        amenities: [
          'Gym',
          'Swimming Pool',
          'Concierge Service',
          'Underground Parking',
          'Rooftop Garden',
        ],
        featured: true,
        images: [],
        location: {
          latitude: 25.197,
          longitude: 55.274,
          address: '456 Central Avenue, Downtown District',
        },
      },

      // Townhouse - Featured
      {
        unitName: 'Park View Townhouse',
        unitNumber: 'T103',
        project: 'Green Valley Estates',
        description:
          'Elegant townhouse adjacent to Central Park with three floors of comfortable living space. This family-friendly property features high ceilings, hardwood floors, and abundant natural light. The private backyard and rooftop terrace provide excellent outdoor spaces for relaxation and entertainment.',
        price: 1250000,
        bedrooms: 3,
        bathrooms: 3.5,
        area: 210.25,
        propertyType: 'Townhouse',
        amenities: [
          'Private Garden',
          'Rooftop Terrace',
          'Built-in Wardrobes',
          'Double Garage',
          'Community Pool',
          "Children's Playground",
        ],
        featured: true,
        images: [],
        location: {
          latitude: 25.154,
          longitude: 55.212,
          address: '789 Park Lane, Green Valley',
        },
      },

      // Budget Apartment - Not Featured
      {
        unitName: 'Cozy Studio',
        unitNumber: 'S101',
        project: 'City Lights',
        description:
          'Affordable studio apartment perfect for students or young professionals. This compact unit makes efficient use of space with a modern kitchenette, comfortable living area, and updated bathroom. Located near public transportation and universities.',
        price: 325000,
        bedrooms: 0,
        bathrooms: 1,
        area: 45.0,
        propertyType: 'Apartment',
        amenities: [
          'Security System',
          'Laundry Facilities',
          'Storage Unit',
          'Bike Storage',
        ],
        featured: false,
        images: [],
        location: {
          latitude: 25.221,
          longitude: 55.282,
          address: '101 University Ave, Education District',
        },
      },

      // Family Villa - Featured
      {
        unitName: 'Family Haven',
        unitNumber: 'V102',
        project: 'Suburban Heights',
        description:
          'Spacious family villa in a quiet suburban neighborhood. This well-maintained property features a large kitchen, open living spaces, and generous bedrooms. The backyard includes a swimming pool, barbecue area, and a small garden. Perfect for families looking for comfort and convenience.',
        price: 1850000,
        bedrooms: 4,
        bathrooms: 3,
        area: 280.5,
        propertyType: 'Villa',
        amenities: [
          'Swimming Pool',
          'Garden',
          'Garage',
          'Play Area',
          'Storage Room',
          'Study Room',
        ],
        featured: true,
        images: [],
        location: {
          latitude: 25.115,
          longitude: 55.198,
          address: '456 Family Lane, Suburban District',
        },
      },

      // Small Townhouse - Not Featured
      {
        unitName: 'Starter Townhouse',
        unitNumber: 'T35',
        project: 'First Steps Development',
        description:
          'Perfect starter home for young couples or small families. This modestly sized townhouse offers a functional layout with a combined living and dining area, a modern kitchen, and comfortable bedrooms. The community features parks, playgrounds, and shops within walking distance.',
        price: 620000,
        bedrooms: 2,
        bathrooms: 1.5,
        area: 130.75,
        propertyType: 'Townhouse',
        amenities: [
          'Community Park',
          'Visitor Parking',
          'Security Patrol',
          'Small Garden',
        ],
        featured: false,
        images: [],
        location: {
          latitude: 25.133,
          longitude: 55.256,
          address: '35 New Beginnings Rd, Starter District',
        },
      },
    ];

    for (const apartmentData of apartments) {
      const apartment = this.apartmentsRepository.create(apartmentData);
      await this.apartmentsRepository.save(apartment);
    }

    console.log('Seeded 6 apartments successfully');
  }
}
