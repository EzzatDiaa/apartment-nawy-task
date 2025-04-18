# Apartment Listing Application

A full-stack application for listing and managing apartment listings with modern search and filtering capabilities.

## Tech Stack

### Backend

- **Framework:** NestJS (Node.js + TypeScript)
- **Database:** PostgreSQL
- **ORM:** TypeORM

### Frontend

- **Framework:** Next.js (React + TypeScript)
- **Styling:** TailwindCSS
- **State Management:** React Hooks
- **API Communication:** Axios

## Features

- Modern, responsive UI with intuitive navigation
- Advanced search functionality:
  - Search by text (unit name, unit number, or project)
  - Filter by property type (Apartment, Villa, Townhouse)
  - Filter by number of bedrooms and bathrooms
  - Filter by price range with interactive slider
- Detailed property listings with image galleries
- Featured apartments showcase
- Coming soon pages for features in development
- Responsive design for all device sizes

## Prerequisites

- Docker and Docker Compose
- Node.js v16+ and npm (for local development)

## Getting Started

### Running with Docker

The entire application can be started with a single command:

```bash
docker-compose up -d
```

This will start the PostgreSQL database, backend API, and frontend application. The services will be available at:

- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

### Local Development Setup

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Apartments

- `GET /apartments` - Get all apartments with optional filters
  - Query Parameters:
    - `search`: Search by unit name, unit number, or project
    - `unitName`: Filter by unit name
    - `unitNumber`: Filter by unit number
    - `project`: Filter by project
    - `propertyType`: Filter by property type (Apartment, Villa, Townhouse)
    - `bedrooms`: Filter by minimum number of bedrooms
    - `priceMin`: Filter by minimum price
    - `priceMax`: Filter by maximum price
- `GET /apartments/:id` - Get a specific apartment by ID
- `POST /apartments` - Create a new apartment

## Project Structure

```
apartment-listing-app/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── apartments/     # Apartments module
│   │   │   ├── dto/        # Data Transfer Objects
│   │   │   ├── entities/   # Database entities
│   │   │   ├── apartments.controller.ts
│   │   │   ├── apartments.module.ts
│   │   │   └── apartments.service.ts
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   ├── Dockerfile          # Backend Docker configuration
│   └── package.json
├── frontend/               # Next.js frontend
│   ├── components/         # Reusable React components
    |   ├── AdvancedSearchPage.tsx # Advance Search filters
│   │   ├── ApartmentCard.tsx   # Card component for apartment listings
│   │   ├── SearchFilter.tsx  # Filter component on the Home page
│   │   ├── Layout.tsx          # Main layout component
│   ├── pages/              # Application pages
│   │   ├── apartments/     # Apartment listing and detail pages
│   │   ├── search.tsx      # Advanced search page
│   │   ├── coming-soon.tsx # Coming soon page for features in development
│   │   └── index.tsx       # Home page
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

## Key Components

### CleanSearchFilter Component

The application features a modern, user-friendly search interface with:

- Property type selection (Apartment, Villa, Townhouse)
- Bedroom and bathroom filters with intuitive circular selectors
- Price range filter with interactive slider and input fields
- Responsive design that works on all device sizes

### Apartment Cards

Property listings are displayed in clean, modern cards that show:

- Property images with featured tags when applicable
- Key details such as price, bedrooms, and bathrooms
- Property type and location information
- Quick access to view detailed information

### Responsive Layout

The application is fully responsive with:

- Mobile-optimized navigation with hamburger menu
- Proper display of search filters on smaller screens
- Image galleries that adapt to screen size
- Overlapping search component that bridges the hero section and main content

## Data Model

The apartment entity includes the following fields:

- `id`: Unique identifier
- `unitName`: Name of the apartment unit
- `unitNumber`: Unit number
- `project`: Project or development name
- `description`: Detailed description
- `price`: Price in dollars
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `area`: Size in square meters
- `amenities`: List of available amenities
- `featured`: Flag for featured listings
- `images`: List of image URLs
- `location`: Object containing latitude, longitude, and address
- `propertyType`: Type of property (Apartment, Villa, Townhouse)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Development Considerations

- The application is built with TypeScript for type safety and better developer experience
- NestJS provides a modular architecture inspired by Angular, making the codebase organized and maintainable
- The frontend is built with Next.js, providing server-side rendering capabilities and improved SEO
- Docker and Docker Compose are used for containerization, making deployment easier and more consistent
- TypeORM's synchronize feature automatically updates the database schema in development

## Future Improvements

- Add user authentication and authorization
- Implement a more advanced search with geolocation features
- Add image upload functionality
- Implement unit and integration tests
- Add pagination for apartment listings
- Enhance filtering with more property attributes
- Add favorites and saved searches
- Implement a review system for properties
