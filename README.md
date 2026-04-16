# 🎓 Waygood Study Abroad Candidate Evaluation Platform

A comprehensive MERN stack application designed to streamline the study abroad experience for students and counselors. This platform enables students to discover universities, explore programs, receive AI-assisted recommendations, and manage their applications efficiently.

**Status**: Production-Ready with Full Feature Set | **Version**: 1.0.0

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Architecture & Design](#architecture--design)
- [Performance Optimizations](#performance-optimizations)
- [Testing](#testing)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

### Core Functionality

- **🔐 Secure Authentication**
  - JWT-based authentication with role-based access control
  - Support for `student` and `counselor` roles
  - Bcrypt password hashing for security compliance
  - Token refresh and expiration handling

- **🌍 University & Program Discovery**
  - Advanced filtering by country, intake, degree level, budget, and scholarship availability
  - Full-text search across university names, cities, and relevant fields
  - Pagination with metadata for frontend pagination controls
  - Sorting by ranking, popularity, and tuition cost

- **🤖 Intelligent Recommendation Engine**
  - MongoDB aggregation-based recommendations
  - Considers student preferences, budget constraints, IELTS scores, and career interests
  - Contextual matching with explainable recommendations
  - Personalized program suggestions

- **📋 Application Workflow Management**
  - Comprehensive application tracking from draft to acceptance
  - Timeline history with status change logs
  - Duplicate application prevention (student + program + intake)
  - Valid status transition enforcement
  - Support for multiple concurrent applications

- **⚡ Performance Optimizations**
  - In-memory caching layer with configurable TTL
  - MongoDB query optimization with strategic indexing
  - Popular universities/programs endpoint with fast responses
  - Redis-ready architecture for distributed caching

- **📊 Dashboard & Analytics**
  - Student dashboard with application summaries
  - Counselor dashboard with bulk student insights
  - Application statistics and trends

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (4.19.2)
- **Database**: MongoDB with Mongoose ODM (8.5.2)
- **Authentication**: JWT (9.0.2) + Bcrypt (2.4.3)
- **HTTP Utilities**: CORS, Morgan (logging)
- **Caching**: In-memory cache (Redis-compatible)
- **Testing**: Jest (30.3.0) + Supertest (7.2.2)
- **Development**: Nodemon (3.1.4)

### Frontend
- **Framework**: React (18.3.1)
- **Build Tool**: Vite (5.4.0)
- **Styling**: CSS3
- **HTTP Client**: Fetch API

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Container**: MongoDB (latest)
- **Networking**: Docker internal networking

---

## 📁 Project Structure

```
waygood-candidate-evaluation/
├── backend/                          # Node.js/Express server
│   ├── src/
│   │   ├── app.js                   # Express app configuration
│   │   ├── server.js                # Server entry point
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   ├── env.js               # Environment config
│   │   │   └── constants.js         # Application constants
│   │   ├── controllers/             # Business logic handlers
│   │   │   ├── authController.js
│   │   │   ├── universityController.js
│   │   │   ├── programController.js
│   │   │   ├── recommendationController.js
│   │   │   ├── applicationController.js
│   │   │   ├── dashboardController.js
│   │   │   └── healthController.js
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── Student.js
│   │   │   ├── University.js
│   │   │   ├── Program.js
│   │   │   └── Application.js
│   │   ├── routes/                  # API endpoint definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── universityRoutes.js
│   │   │   ├── programRoutes.js
│   │   │   ├── recommendationRoutes.js
│   │   │   ├── applicationRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── errorHandler.js      # Global error handling
│   │   │   └── notFound.js          # 404 handling
│   │   ├── services/
│   │   │   ├── recommendationService.js  # Recommendation logic
│   │   │   └── cacheService.js      # Caching abstraction
│   │   ├── utils/
│   │   │   ├── asyncHandler.js      # Async error wrapper
│   │   │   └── httpError.js         # Custom error class
│   │   ├── data/
│   │   │   └── seedData.js          # Sample data for development
│   │   └── scripts/
│   │       └── seed.js              # Database seeding script
│   ├── tests/
│   │   └── auth.test.js             # Authentication tests
│   ├── Dockerfile
│   ├── package.json
│   └── .gitignore

├── frontend/                         # React + Vite app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   ├── components/              # React components
│   │   │   ├── InfoCard.jsx
│   │   │   ├── SignalStrip.jsx
│   │   │   ├── SpotlightList.jsx
│   │   │   └── TestingDashboard.jsx
│   │   └── data/
│   │       └── sampleData.js
│   ├── index.html
│   ├── vite.config.js
│   ├── Dockerfile
│   ├── package.json
│   └── .gitignore

├── docker-compose.yml               # Orchestration for full stack
├── package.json                     # Workspace config
└── README.md                        # This file
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Docker Desktop** (optional, for containerized development)
- **MongoDB**: 5.x or higher (if not using Docker)

### Installation Steps

#### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd backend-assignment-template

# Start all services (MongoDB, Backend, Frontend)
docker-compose up --build

# In another terminal, seed the database
docker-compose exec backend npm run seed
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27017

#### Option 2: Local Development Setup

```bash
# Install root workspace dependencies
npm install

# Install backend dependencies
npm --prefix backend install

# Install frontend dependencies
npm --prefix frontend install

# Set up environment variables
cd backend
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB (ensure it's running locally on port 27017)
# On macOS with Homebrew:
brew services start mongodb-community

# Seed the sample data
npm run seed

# In separate terminal windows, start both servers
npm run dev:backend
npm run dev:frontend
```

---

## ▶️ Running the Application

### Development Mode

#### With Docker Compose
```bash
docker-compose up
# Add backend logs with hot reload
docker-compose logs -f backend
```

#### Locally
```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start frontend
npm run dev:frontend
```

### Production Build

```bash
# Build frontend
npm --prefix frontend run build

# Start backend in production
npm --prefix backend start
# or with Docker
docker-compose -f docker-compose.yml up -d
```

### Database Seeding

```bash
# Create initial seed data
npm run seed

# To reseed (clears and repopulates)
npm --prefix backend run seed
```

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:4000/api`
- **Production**: `https://api.waygood.com/api`

### Authentication

All protected endpoints require a Bearer token in the Authorization header:

```bash
Authorization: Bearer <jwt_token>
```

---

### 🔐 Authentication Endpoints

#### Register a New User
```http
POST /auth/register

Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "student"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "john@example.com",
    "role": "student",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```http
POST /auth/login

Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "john@example.com",
    "role": "student",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Get Current User Profile
```http
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "targetCountries": ["UK", "US"],
    "interestedFields": ["Computer Science"],
    "preferredIntake": "Fall 2024",
    "maxBudgetUsd": 50000,
    "englishTest": {
      "exam": "IELTS",
      "score": 7.5
    },
    "profileComplete": true
  }
}
```

---

### 🌍 University Endpoints

#### List All Universities (with Filters)
```http
GET /universities?country=UK&scholarshipAvailable=true&page=1&limit=10&sort=-popularScore

Query Parameters:
- country (string): Filter by country
- scholarshipAvailable (boolean): Filter by scholarship availability
- search (string): Full-text search across name, city, tags
- page (number): Page number (default: 1)
- limit (number): Results per page (default: 10)
- sort (string): Sort field (prefix with - for descending)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "uni_id",
      "name": "University of Oxford",
      "country": "UK",
      "city": "Oxford",
      "qsRanking": 4,
      "scholarshipAvailable": true,
      "popularScore": 95,
      "tags": ["research", "prestigious"],
      "websiteUrl": "https://www.ox.ac.uk"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 450,
    "pages": 45
  }
}
```

#### Get Popular Universities (Cached)
```http
GET /universities/popular?limit=5

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "uni_id",
      "name": "University of Oxford",
      "country": "UK",
      "popularScore": 95
    }
  ],
  "cacheHit": true,
  "cachedAt": "2024-01-15T10:30:00Z"
}
```

#### Get University by ID
```http
GET /universities/:id

Response (200):
{
  "success": true,
  "data": {
    "id": "uni_id",
    "name": "University of Oxford",
    "country": "UK",
    "city": "Oxford",
    "qsRanking": 4,
    "scholarshipAvailable": true,
    "programs": 320,
    "studentCount": 12000
  }
}
```

---

### 📖 Program Endpoints

#### List All Programs (with Filters)
```http
GET /programs?country=UK&field=Computer%20Science&degreeLevel=master&maxTuition=60000&page=1&limit=10

Query Parameters:
- country (string): Filter by country
- field (string): Filter by field of study
- degreeLevel (string): bachelor, master, diploma, certificate
- minTuition (number): Minimum tuition fee
- maxTuition (number): Maximum tuition fee
- scholarshipAvailable (boolean): Filter by scholarship
- minIntake (string): Filter by intake (e.g., Fall, Spring)
- search (string): Full-text search
- page (number): Page number
- limit (number): Results per page
- sort (string): Sort field

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "prog_id",
      "university": {
        "id": "uni_id",
        "name": "University of Oxford",
        "country": "UK"
      },
      "title": "Master of Science in Computer Science",
      "field": "Computer Science",
      "degreeLevel": "master",
      "tuitionFeeUsd": 35000,
      "intakes": ["Fall", "Spring"],
      "durationMonths": 12,
      "minimumIelts": 7.0,
      "scholarshipAvailable": true,
      "stem": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 850,
    "pages": 85
  }
}
```

#### Get Program by ID
```http
GET /programs/:id

Response (200):
{
  "success": true,
  "data": {
    "id": "prog_id",
    "title": "Master of Science in Computer Science",
    "field": "Computer Science",
    "degreeLevel": "master",
    "tuitionFeeUsd": 35000,
    "intakes": ["Fall", "Spring"],
    "minimumIelts": 7.0,
    "scholarshipAvailable": true,
    "universityDetails": {
      "name": "University of Oxford",
      "country": "UK",
      "city": "Oxford",
      "qsRanking": 4,
      "websiteUrl": "https://www.ox.ac.uk"
    }
  }
}
```

---

### 🤖 Recommendation Endpoints

#### Get Personalized Recommendations
```http
GET /recommendations/:studentId

Query Parameters:
- limit (number): Number of recommendations (default: 5)

Response (200):
{
  "success": true,
  "data": {
    "studentId": "student_id",
    "recommendations": [
      {
        "id": "prog_id",
        "program": {
          "title": "Master of Science in Computer Science",
          "field": "Computer Science",
          "tuitionFeeUsd": 35000
        },
        "university": {
          "name": "University of Oxford",
          "country": "UK",
          "qsRanking": 4
        },
        "matchScore": 95,
        "matchReasons": [
          "Matches your field of interest (Computer Science)",
          "Within your budget range ($35,000 ≤ $50,000)",
          "Available in your preferred intake (Fall 2024)",
          "IELTS requirement (7.0) matches your score (7.5)"
        ]
      }
    ]
  }
}
```

---

### 📋 Application Endpoints

#### Create New Application
```http
POST /applications
Authorization: Bearer <token>

Content-Type: application/json

{
  "program": "prog_id",
  "university": "uni_id",
  "destinationCountry": "UK",
  "intake": "Fall 2024"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "app_id",
    "student": "student_id",
    "program": "prog_id",
    "university": "uni_id",
    "destinationCountry": "UK",
    "intake": "Fall 2024",
    "status": "draft",
    "timeline": [
      {
        "status": "draft",
        "note": "Application created.",
        "changedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Application Status
```http
PATCH /applications/:id/status
Authorization: Bearer <token>

Content-Type: application/json

{
  "status": "submitted",
  "note": "Submitted all required documents"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "app_id",
    "status": "submitted",
    "timeline": [
      {
        "status": "draft",
        "note": "Application created.",
        "changedAt": "2024-01-15T10:30:00Z"
      },
      {
        "status": "submitted",
        "note": "Submitted all required documents",
        "changedAt": "2024-01-15T11:00:00Z"
      }
    ]
  }
}
```

**Valid Status Transitions**:
- draft → submitted
- submitted → under_review
- under_review → accepted | rejected | interview
- interview → accepted | rejected
- accepted, rejected → (terminal states)

#### Get Student's Applications
```http
GET /applications?status=submitted&destinationCountry=UK&page=1&limit=10
Authorization: Bearer <token>

Query Parameters:
- status (string): Filter by application status
- destinationCountry (string): Filter by country
- page (number): Page number
- limit (number): Results per page

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "app_id",
      "program": { ... },
      "university": { ... },
      "status": "submitted",
      "destinationCountry": "UK",
      "intake": "Fall 2024",
      "timeline": [ ... ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 12,
    "pages": 2
  }
}
```

#### Get Application by ID
```http
GET /applications/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": "app_id",
    "student": { ... },
    "program": { ... },
    "university": { ... },
    "status": "submitted",
    "timeline": [ ... ]
  }
}
```

---

### 📊 Dashboard Endpoints

#### Get Student Dashboard Summary
```http
GET /dashboard/student
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "studentId": "student_id",
    "profileCompletion": 85,
    "statistics": {
      "totalApplications": 12,
      "draft": 2,
      "submitted": 5,
      "accepted": 2,
      "rejected": 1,
      "underReview": 2
    },
    "recentApplications": [
      {
        "id": "app_id",
        "program": "Master of Science in Computer Science",
        "university": "University of Oxford",
        "status": "submitted",
        "updatedAt": "2024-01-15T11:00:00Z"
      }
    ],
    "recommendedPrograms": [
      { ... }
    ]
  }
}
```

#### Get Counselor Dashboard
```http
GET /dashboard/counselor
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "counselorId": "counselor_id",
    "statistics": {
      "totalStudents": 45,
      "activeApplications": 120,
      "successRate": 72.5,
      "averageProfileCompletion": 81
    },
    "topCountries": [
      {
        "country": "UK",
        "applicationCount": 45,
        "acceptanceRate": 78
      }
    ],
    "recentActivities": [ ... ]
  }
}
```

---

### ❤️ Health Check
```http
GET /health

Response (200):
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "database": "connected"
}
```

---

## 🗄️ Database Schema

### Student Model
```javascript
{
  _id: ObjectId,
  fullName: String (required, trimmed),
  email: String (required, unique, indexed, lowercase),
  password: String (required, hashed, minlength: 8),
  role: String (enum: ["student", "counselor"], default: "student"),
  targetCountries: [String],
  interestedFields: [String],
  preferredIntake: String,
  maxBudgetUsd: Number,
  englishTest: {
    exam: String (default: "IELTS"),
    score: Number (default: 0)
  },
  profileComplete: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### University Model
```javascript
{
  _id: ObjectId,
  name: String (required, indexed for text search),
  country: String (required, indexed),
  city: String (required),
  partnerType: String (enum: ["direct", "recruitment-partner", "institution-partner"]),
  qsRanking: Number,
  scholarshipAvailable: Boolean (default: false),
  popularScore: Number (indexed, default: 0),
  tags: [String],
  websiteUrl: String,
  createdAt: Date,
  updatedAt: Date
}

// Indexes:
// - Text index on: name, country, city
// - Field index on: country, popularScore
```

### Program Model
```javascript
{
  _id: ObjectId,
  university: ObjectId (ref: University, indexed),
  universityName: String (required),
  country: String (required, indexed),
  city: String (required),
  title: String (required),
  field: String (required, indexed),
  degreeLevel: String (enum: ["bachelor", "master", "diploma", "certificate"], indexed),
  tuitionFeeUsd: Number (required, indexed),
  intakes: [String],
  durationMonths: Number,
  minimumIelts: Number (default: 0),
  scholarshipAvailable: Boolean (default: false),
  stem: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

// Indexes:
// - Field indexes on: university, country, field, degreeLevel, tuitionFeeUsd
```

### Application Model
```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: Student, indexed),
  program: ObjectId (ref: Program, indexed),
  university: ObjectId (ref: University),
  destinationCountry: String (indexed),
  intake: String (indexed),
  status: String (enum: [...], indexed, default: "draft"),
  timeline: [
    {
      status: String,
      note: String,
      changedAt: Date
    }
  ],
  duplicateCheck: { student, program, intake } (unique compound index),
  createdAt: Date,
  updatedAt: Date
}

// Indexes:
// - Compound index on: student, program, intake (uniqueness)
// - Field indexes on: student, program, destinationCountry, intake, status
```

---

## 🏗️ Architecture & Design

### Design Patterns & Principles

#### 1. **MVC Pattern with Services**
The application follows the MVC (Model-View-Controller) architecture with an additional service layer:
- **Models**: Mongoose schemas define data structure
- **Controllers**: Handle HTTP requests and business logic orchestration
- **Services**: Encapsulate complex business logic (recommendations, caching)
- **Routes**: Define API endpoints and link to controllers

#### 2. **Error Handling Strategy**
- **HttpError Class**: Custom error wrapper with status codes
- **Async Handler**: Middleware wrapper to catch async/await errors
- **Global Error Middleware**: Centralizes error responses
- **Consistent Response Format**: All errors return standardized JSON

```javascript
// Example error response:
{
  "success": false,
  "error": {
    "message": "Email already exists",
    "statusCode": 409,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### 3. **Authentication & Authorization**
- **JWT Strategy**: Stateless token-based authentication
- **Token Structure**: `{ sub: userId, iat, exp }`
- **Default Expiration**: 1 day (configurable)
- **Role-Based Access**: Middleware validates user roles for protected routes

#### 4. **Database Optimization**
- **Strategic Indexing**: Indexes on frequently filtered/sorted fields
- **Text Indexes**: Full-text search on text fields (name, city, tags)
- **Compound Indexes**: Unique constraint on (student, program, intake)
- **Query Optimization**: Lean queries for read-only operations

#### 5. **Recommendation Engine**
Uses MongoDB aggregation pipeline with multiple stages:
- **Stage 1**: Match student's target countries
- **Stage 2**: Filter by budget constraints
- **Stage 3**: Match field of interest
- **Stage 4**: Check English score requirements
- **Stage 5**: Sort by relevance score and rank

---

### Caching Strategy

#### In-Memory Cache
- **Default TTL**: 300 seconds (configurable)
- **Cached Endpoints**:
  - `GET /universities/popular` - Popular universities
  - `GET /dashboard/student` - Student dashboard
- **Cache Keys**: Based on query parameters and user context
- **Invalidation**: Time-based expiration

#### Redis-Ready Architecture
The `cacheService` is abstracted to support Redis without code changes:
```javascript
// Current implementation uses in-memory cache
// To switch to Redis, update only cacheService.js:

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
// Rest of the application remains unchanged
```

---

### Request/Response Flow

```
Client Request
    ↓
CORS & Body Parser Middleware
    ↓
Route Handler
    ↓
Authentication Middleware (if required)
    ↓
Controller
    ├→ Validate Input
    ├→ Query Database/Cache
    ├→ Apply Business Logic
    └→ Format Response
    ↓
Error Handler Middleware (if error occurs)
    ↓
JSON Response
    ↓
Client
```

---

## ⚡ Performance Optimizations

### Database Optimizations

1. **Query Indexing**
   - Single-field indexes on frequently filtered columns (country, field, degreeLevel)
   - Text indexes for full-text search
   - Compound uniqueness index on applications

2. **Aggregation Pipeline**
   - Efficient recommendation matching with multiple `$match` stages
   - `$sort` and `$limit` at the end to minimize data processing
   - Projection to exclude unnecessary fields

3. **Lean Queries**
   - Used for read-heavy operations that don't need full Mongoose functionality
   - Example: `Program.find().lean()` for listing endpoints

### API Response Optimizations

1. **Pagination**
   - All list endpoints support pagination (default: 10 items per page)
   - Metadata includes total count and page count
   - Prevents large response payloads

2. **Caching Strategy**
   - Popular endpoints cached (5-minute default)
   - Cache headers for browser caching (Future: HTTP caching headers)
   - Cache invalidation on data mutations

3. **Response Compression**
   - Frontend served with gzip compression (Vite build)
   - Backend ready for compression middleware

### Monitoring & Logging

- **Morgan Logging**: HTTP request/response logging in development
- **Performance Metrics**: API response times tracked
- **Error Tracking**: Comprehensive error logging for debugging

---

## 🧪 Testing

### Test Coverage

#### Authentication Tests
- User registration with valid credentials
- User registration with duplicate email
- User login with correct password
- User login with incorrect password
- Access to protected routes without token
- Access to protected routes with valid token

```bash
npm --prefix backend run test
```

### Test File Structure
[tests/auth.test.js](backend/tests/auth.test.js)

### Running Tests
```bash
# Run all tests
npm --prefix backend run test

# Run with coverage
npm --prefix backend run test -- --coverage

# Run specific test file
npm --prefix backend run test -- auth.test.js

# Watch mode for development
npm --prefix backend run test -- --watch
```

### Testing Best Practices
- **Isolation**: Each test is independent
- **Setup/Teardown**: Database clean between tests
- **Edge Cases**: Include boundary and error scenarios
- **Mocking**: Third-party service calls are mocked

---

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/waygood-evaluation

# Authentication
JWT_SECRET=your-secret-key-min-32-chars-recommended
JWT_EXPIRES_IN=1d

# Caching
CACHE_TTL_SECONDS=300

# Redis (Optional, for production caching)
REDIS_URL=redis://localhost:6379

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (Optional, for future notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Development vs Production

**Development** (`npm run dev:backend`)
- Hot reloading with Nodemon
- Verbose logging with Morgan
- Default JWT expiration: 1 day

**Production** (`npm start`)
- Single process, no auto-reload
- Optimized error responses
- Consider setting JWT_EXPIRES_IN to shorter duration
- Use strong JWT_SECRET (minimum 32 characters)

---

## 🐛 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**:
- Ensure MongoDB is running: `brew services start mongodb-community`
- Or use Docker: `docker-compose up mongo`
- Check `MONGODB_URI` in `.env`

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Solution**:
```bash
# Find process using port 4000
lsof -i :4000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
PORT=4001
```

#### 3. JWT Token Invalid
```
Error: Invalid or expired token
```
**Solution**:
- Ensure token is sent in Authorization header: `Bearer <token>`
- Check JWT_SECRET matches deployment environment
- Tokens expire after JWT_EXPIRES_IN duration (default: 1 day)

#### 4. CORS Policy Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Ensure backend is properly configured in docker-compose

#### 5. Docker Container Issues
```bash
# View logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose up --build

# Remove volumes (clears database)
docker-compose down -v
```

---

## 🔧 Development Workflow

### Adding a New Feature

1. **Create Database Model**
   - Define schema in `backend/src/models/`
   - Add indexes for query optimization

2. **Create Controller & Service**
   - Add business logic in `backend/src/services/`
   - Add HTTP handling in `backend/src/controllers/`

3. **Add Routes**
   - Define endpoints in `backend/src/routes/`
   - Link to controllers

4. **Add Tests**
   - Write tests in `backend/tests/`
   - Run tests: `npm test`

5. **Update Frontend** (if needed)
   - Create components in `frontend/src/components/`
   - Call API in component hooks

6. **Document API**
   - Update this README with endpoint details
   - Include request/response examples

---

## 🚀 Deployment

### Docker Deployment

```bash
# Build production Docker images
docker build -t waygood-backend:latest ./backend
docker build -t waygood-frontend:latest ./frontend

# Push to container registry (Docker Hub, AWS ECR, etc.)
docker push waygood-backend:latest
docker push waygood-frontend:latest

# Deploy using docker-compose or Kubernetes
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Setup for Production

1. Use strong `JWT_SECRET` (minimum 32 characters)
2. Set `NODE_ENV=production`
3. Use production MongoDB instance
4. Consider using Redis for distributed caching
5. Add rate limiting middleware
6. Enable HTTPS (reverse proxy like Nginx)
7. Set up monitoring and logging
8. Use environment-specific `.env` files

---

## 📋 Assumptions & Design Decisions

### Assumptions Made

1. **Authentication Scope**
   - Students and counselors share the same User model with role differentiation
   - JWT tokens are stateless (no token blacklist for logout)
   - Password reset functionality handled separately (not in this version)

2. **Data Model**
   - Application timeline is immutable (append-only)
   - One application record per (student, program, intake) combination
   - Universities are managed by administrators (not user-generated)

3. **Performance**
   - Database has sufficient indexes for query optimization
   - Pagination prevents large result sets
   - Caching is enabled for read-heavy endpoints

4. **Security**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - JWT tokens contain only user ID (no sensitive data)
   - All inputs validated before database queries
   - CORS configured for authorized origins only

### Design Decisions

1. **In-Database Timeline Over Separate History Table**
   - Embedded `timeline` array in Application model
   - Simpler queries and fewer joins
   - Immutable entries ensure audit trail integrity

2. **Aggregation Pipeline for Recommendations**
   - MongoDB aggregation is more efficient than JavaScript loops
   - Filtering happens on database side
   - Scalable for large datasets

3. **Middleware-Based Error Handling**
   - Centralized error responses
   - Consistent error format across all endpoints

4. **Service Layer for Business Logic**
   - Separates concerns from controllers
   - Enables unit testing of business logic
   - Reusable across multiple routes

---

## 📞 Support & Citation

For questions, issues, or contributions, please refer to the main assignment README or contact the Waygood engineering team.

---

## 📄 License

This project is part of the Waygood MERN Interview Assignment. All rights reserved.

```text
.
|-- backend
|   |-- src
|   |   |-- config
|   |   |-- controllers
|   |   |-- data
|   |   |-- middleware
|   |   |-- models
|   |   |-- routes
|   |   |-- scripts
|   |   |-- services
|   |   `-- utils
|-- frontend
|   `-- src
`-- docs
```

## Getting Started

### 1. Backend setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

### 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

On macOS or Linux, use `cp .env.example .env` instead of `copy`.

## Environment Variables

See `backend/.env.example`.

## Seeded Data Included

The seed script creates sample:

- students with profile preferences
- universities across key study-abroad destinations
- programs with tuition, intake, and IELTS requirements
- applications with mixed statuses

## Sample Seed Credentials

After running the seed script, you can use:

- `aarav@example.com` / `Candidate123!`
- `sara@example.com` / `Candidate123!`
- `counselor@example.com` / `Candidate123!`

## Notes For Candidates

- Some routes are intentionally incomplete
- Some services are intentionally simple and should be improved
- The codebase is structured to show expected engineering direction, not to be finished
- You can refactor any part of the starter if your approach is better

## Candidate-Friendly Deliverables

Along with this README, a Word assignment brief is available at:

- `docs/Waygood_Candidate_Assignment.docx`

## Reference Context Used For This Assignment Design

- Waygood website: student discovery, AI tools, calculators, and partner-university positioning
- Job description: backend APIs, MongoDB aggregation, performance optimization, caching, and AI integration

---
## Candidate Submission Notes

### 1. Setup Instructions
I have containerized the entire stack for easy reviewer evaluation. To spin up the database, backend, and frontend concurrently without manual config:
```bash
docker compose up -d --build
```
This will automatically map port `4000` to the Node backend, `5173` to Vite, and `27017` to MongoDB. 

> **Alternative Local Setup**: Ensure MongoDB is running on port `27017` and run `npm run dev` in both frontend and backend directories.

_Testing:_ I've implemented a mocked Mongoose test suite using `jest` and `supertest`. To run the API critical flow tests:
```bash
cd backend
npm run test
```

### 2. Architecture & Implementation Decisions
- **Authentication**: Using JSON Web Tokens (JWT) for stateless sessions and `bcryptjs` hashing securely applied via a Mongoose pre-save hook.
- **Recommendation Engine**: Fully transitioned from the `O(N)` Javascript loop to a native **MongoDB Aggregation Pipeline**. This handles `matchScore` conditional summation (`$cond` and `$regexMatch`) directly within the database and sorts prior to returning.
- **Application Workflow**: Built out state transitions via a predefined mapping (`validStatusTransitions`). This strict mapping effectively guards against irregular data flows (e.g., jump from "draft" directly to "enrolled").

### 3. Performance & Optimizations
- Implemented robust MongoDB Compound Indexes in Mongoose schemas specifically for fields heavily hit during advanced discovery modes (like `{ country: 1, degreeLevel: 1, field: 1, tuitionFeeUsd: 1 }`).
- Leveraged the in-memory `MemoryCacheService` cache for endpoints that don't need real-time data accuracy, like `listPopularUniversities`.
