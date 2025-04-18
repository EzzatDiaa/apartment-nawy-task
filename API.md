# Apartment Listing API Documentation

This document provides detailed information about the API endpoints available in the Apartment Listing Application.

## Base URL

All endpoints are relative to:

```
http://localhost:3000
```

## Authentication

Currently, the API does not require authentication.

## Endpoints

### Apartments

#### Get All Apartments

Retrieves a list of all apartments, with optional filtering.

- **URL**: `/apartments`
- **Method**: `GET`
- **Query Parameters**:

  - `search`: Search in unit name, unit number, or project (string, optional)
  - `unitName`: Filter by unit name (string, optional)
  - `unitNumber`: Filter by unit number (string, optional)
  - `project`: Filter by project name (string, optional)
  - `propertyType`: Filter by property type - Apartment, Villa, or Townhouse (string, optional)
  - `bedrooms`: Filter by minimum number of bedrooms (string, optional)
  - `priceMin`: Filter by minimum price (string, optional)
  - `priceMax`: Filter by maximum price (string, optional)

- **Success Response**:

  - **Code**: 200 OK
  - **Content Example**:
    ```json
    [
      {
        "id": 1,
        "unitName": "Sunset Villa",
        "unitNumber": "V001",
        "project": "Coastal Heights",
        "description": "Luxurious beachfront villa with panoramic ocean views...",
        "price": 3500000,
        "bedrooms": 5,
        "bathrooms": 6,
        "area": 450.75,
        "amenities": ["Private Pool", "Beachfront", "Smart Home System"],
        "featured": true,
        "images": ["https://example.com/villa1.jpg"],
        "location": {
          "latitude": 25.103,
          "longitude": 55.174,
          "address": "123 Coastal Drive, Palm Beach"
        },
        "propertyType": "Villa",
        "createdAt": "2025-04-18T10:30:00.000Z",
        "updatedAt": "2025-04-18T10:30:00.000Z"
      }
    ]
    ```

- **Error Response**:
  - **Code**: 500 Internal Server Error
  - **Content**:
    ```json
    {
      "statusCode": 500,
      "message": "Internal server error"
    }
    ```

#### Get Apartment by ID

Retrieves a specific apartment by its ID.

- **URL**: `/apartments/:id`
- **Method**: `GET`
- **URL Parameters**:

  - `id`: ID of the apartment (number, required)

- **Success Response**:

  - **Code**: 200 OK
  - **Content Example**:
    ```json
    {
      "id": 1,
      "unitName": "Sunset Villa",
      "unitNumber": "V001",
      "project": "Coastal Heights",
      "description": "Luxurious beachfront villa with panoramic ocean views...",
      "price": 3500000,
      "bedrooms": 5,
      "bathrooms": 6,
      "area": 450.75,
      "amenities": ["Private Pool", "Beachfront", "Smart Home System"],
      "featured": true,
      "images": ["https://example.com/villa1.jpg"],
      "location": {
        "latitude": 25.103,
        "longitude": 55.174,
        "address": "123 Coastal Drive, Palm Beach"
      },
      "propertyType": "Villa",
      "createdAt": "2025-04-18T10:30:00.000Z",
      "updatedAt": "2025-04-18T10:30:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 404 Not Found
  - **Content**:
    ```json
    {
      "statusCode": 404,
      "message": "Apartment with ID 1 not found",
      "error": "Not Found"
    }
    ```

#### Create Apartment

Creates a new apartment.

- **URL**: `/apartments`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: application/json
- **Body**:

  ```json
  {
    "unitName": "Sunset Villa",
    "unitNumber": "V001",
    "project": "Coastal Heights",
    "description": "Luxurious beachfront villa with panoramic ocean views...",
    "price": 3500000,
    "bedrooms": 5,
    "bathrooms": 6,
    "area": 450.75,
    "amenities": ["Private Pool", "Beachfront", "Smart Home System"],
    "featured": true,
    "images": ["https://example.com/villa1.jpg"],
    "propertyType": "Villa",
    "location": {
      "latitude": 25.103,
      "longitude": 55.174,
      "address": "123 Coastal Drive, Palm Beach"
    }
  }
  ```

- **Required Fields**:

  - `unitName`: String - Name of the apartment unit
  - `unitNumber`: String - Unit number
  - `project`: String - Project or development name
  - `description`: String - Detailed description
  - `price`: Number - Price in dollars
  - `bedrooms`: Number - Number of bedrooms
  - `bathrooms`: Number - Number of bathrooms
  - `area`: Number - Size in square meters

- **Optional Fields**:

  - `amenities`: String[] - List of available amenities
  - `featured`: Boolean - Flag for featured listings
  - `images`: String[] - List of image URLs
  - `propertyType`: String - Type of property (Apartment, Villa, Townhouse)
  - `location`: Object - Contains latitude, longitude, and address

- **Success Response**:

  - **Code**: 201 Created
  - **Content Example**: Returns the created apartment with an ID and timestamps
    ```json
    {
      "id": 1,
      "unitName": "Sunset Villa",
      "unitNumber": "V001",
      "project": "Coastal Heights",
      "description": "Luxurious beachfront villa with panoramic ocean views...",
      "price": 3500000,
      "bedrooms": 5,
      "bathrooms": 6,
      "area": 450.75,
      "amenities": ["Private Pool", "Beachfront", "Smart Home System"],
      "featured": true,
      "images": ["https://example.com/villa1.jpg"],
      "location": {
        "latitude": 25.103,
        "longitude": 55.174,
        "address": "123 Coastal Drive, Palm Beach"
      },
      "propertyType": "Villa",
      "createdAt": "2025-04-18T10:30:00.000Z",
      "updatedAt": "2025-04-18T10:30:00.000Z"
    }
    ```

- **Error Response**:
  - **Code**: 400 Bad Request
  - **Content Example** (Missing required fields):
    ```json
    {
      "statusCode": 400,
      "message": ["unitName must be a string", "unitName should not be empty"],
      "error": "Bad Request"
    }
    ```

## Sample API Requests

### Example 1: Get all Villa-type properties

**Request**:

```
GET /apartments?propertyType=Villa
```

**Response** (200 OK):

```json
[
  {
    "id": 1,
    "unitName": "Sunset Villa",
    "unitNumber": "V001",
    "project": "Coastal Heights",
    "description": "Luxurious beachfront villa...",
    "price": 3500000,
    "bedrooms": 5,
    "bathrooms": 6,
    "area": 450.75,
    "amenities": ["Private Pool", "Beachfront", "Smart Home System"],
    "featured": true,
    "images": ["https://example.com/villa1.jpg"],
    "location": {
      "latitude": 25.103,
      "longitude": 55.174,
      "address": "123 Coastal Drive, Palm Beach"
    },
    "propertyType": "Villa",
    "createdAt": "2025-04-18T10:30:00.000Z",
    "updatedAt": "2025-04-18T10:30:00.000Z"
  }
]
```

### Example 2: Get apartments with 2+ bedrooms and price range

**Request**:

```
GET /apartments?bedrooms=2&priceMin=500000&priceMax=2000000
```

**Response** (200 OK):

```json
[
  {
    "id": 2,
    "unitName": "Urban Loft",
    "unitNumber": "A204",
    "project": "Downtown Residences",
    "description": "Modern, well-designed apartment...",
    "price": 750000,
    "bedrooms": 2,
    "bathrooms": 2,
    "area": 110.5,
    "amenities": ["Gym", "Swimming Pool", "Concierge Service"],
    "featured": false,
    "images": ["https://example.com/apartment1.jpg"],
    "location": {
      "latitude": 25.197,
      "longitude": 55.274,
      "address": "456 Central Avenue, Downtown District"
    },
    "propertyType": "Apartment",
    "createdAt": "2025-04-18T11:15:00.000Z",
    "updatedAt": "2025-04-18T11:15:00.000Z"
  }
]
```

### Example 3: Create a new Townhouse

**Request**:

```
POST /apartments
Content-Type: application/json

{
  "unitName": "Park View Townhouse",
  "unitNumber": "T103",
  "project": "Green Valley Estates",
  "description": "Elegant townhouse adjacent to Central Park...",
  "price": 1250000,
  "bedrooms": 3,
  "bathrooms": 3.5,
  "area": 210.25,
  "propertyType": "Townhouse",
  "amenities": [
    "Private Garden",
    "Rooftop Terrace",
    "Built-in Wardrobes",
    "Double Garage",
    "Community Pool",
    "Children's Playground"
  ],
  "featured": true,
  "images": [
    "https://example.com/townhouse1.jpg",
    "https://example.com/townhouse2.jpg"
  ],
  "location": {
    "latitude": 25.154,
    "longitude": 55.212,
    "address": "789 Park Lane, Green Valley"
  }
}
```

**Response** (201 Created):

```json
{
  "id": 3,
  "unitName": "Park View Townhouse",
  "unitNumber": "T103",
  "project": "Green Valley Estates",
  "description": "Elegant townhouse adjacent to Central Park...",
  "price": 1250000,
  "bedrooms": 3,
  "bathrooms": 3.5,
  "area": 210.25,
  "amenities": [
    "Private Garden",
    "Rooftop Terrace",
    "Built-in Wardrobes",
    "Double Garage",
    "Community Pool",
    "Children's Playground"
  ],
  "featured": true,
  "images": [
    "https://example.com/townhouse1.jpg",
    "https://example.com/townhouse2.jpg"
  ],
  "location": {
    "latitude": 25.154,
    "longitude": 55.212,
    "address": "789 Park Lane, Green Valley"
  },
  "propertyType": "Townhouse",
  "createdAt": "2025-04-18T12:00:00.000Z",
  "updatedAt": "2025-04-18T12:00:00.000Z"
}
```
