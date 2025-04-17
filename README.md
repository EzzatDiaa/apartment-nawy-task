# Apartment Listing Application

A full-stack application for listing and managing apartment listings.

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

- View all apartment listings
- View detailed information about a specific apartment
- Search and filter apartments by unit name, unit number, or project
- Responsive design for mobile and desktop
- Containerized application with Docker

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
│   ├── pages/              # Application pages
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

## Architecture

The application follows a traditional three-tier architecture:

1. **Presentation Layer** - Next.js frontend application that provides the user interface
2. **Application Layer** - NestJS backend API that handles business logic and data processing
3. **Data Layer** - PostgreSQL database for data storage

## Development Considerations

- The application is built with TypeScript for type safety and better developer experience
- NestJS provides a modular architecture inspired by Angular, making the codebase organized and maintainable
- The frontend is built with Next.js, providing server-side rendering capabilities and improved SEO
- Docker and Docker Compose are used for containerization, making deployment easier and more consistent

## Future Improvements

- Add user authentication and authorization
- Implement a more advanced search with geolocation features
- Add image upload functionality
- Implement unit and integration tests
- Add pagination for apartment listings
