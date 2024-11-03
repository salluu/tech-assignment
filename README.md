### 1. Introduction

**Overview**  
The **Tech assignment** project is a full-stack application featuring a Next.js frontend and a NestJS backend. It includes user authentication with form validation, API communication, and a well-structured codebase designed to be easily testable and maintainable. This project serves as a foundational example for implementing secure, user-friendly interfaces with robust backend services.

**Features**  
- User Authentication: Signup and login with password validation.
- API Communication: Axios-based API interactions with error handling.
- Form Validation: Client-side form validation using Yup.
- Responsive Design: UI components styled with **ShadCN** and **Tailwind CSS**.
- Testing: Unit and integration tests for both frontend and backend.

**Technology Stack**
- **Frontend**: Next.js, React, **ShadCN**, Tailwind CSS, Axios, Jest, React Testing Library.
- **Backend**: NestJS, MongoDB, Passport (JWT authentication), Jest, Supertest.

---

### 2. Project Structure

**Root Directory**  
- `.env`: Stores environment variables for both frontend and backend.
- `.gitignore`: Specifies files and folders to be ignored by Git.
- `docker-compose.yml`: Configuration for running the application in Docker with both frontend and backend.
- `frontend/`: Contains all files related to the frontend.
- `backend/`: Contains all files related to the backend.

**Frontend Structure**
- **`public/`**: Static assets (e.g., icons, images).
- **`src/`**:
  - `__tests__/`: Contains test files for the Login and Signup pages.
  - `app/`: Main Next.js application structure, with authentication routes (`/auth/login` and `/auth/signup`).
  - `components/`: Reusable UI components, styled with **ShadCN** and **Tailwind CSS** (e.g., `button.tsx`, `input.tsx`).
  - `lib/`: Contains utility files, such as API handlers and validation schemas.
  - `validation/`: Defines Yup schemas for form validation.
- **Other Files**:
  - `jest.config.js`, `jest.setup.ts`: Jest configuration files for testing.
  - `next.config.js`: Configuration for the Next.js application.
  - `tailwind.config.js`, `postcss.config.js`: Tailwind CSS configurations.

**Backend Structure**
- **`src/`**:
  - `auth/`: Handles authentication, including data transfer objects (DTOs), guards, and JWT strategies.
  - `users/`: Manages user-related services and MongoDB user model.
  - `test/`: End-to-end tests for the backend.
- **Other Files**:
  - `jest-e2e.json`: Jest configuration for end-to-end testing.
  - `Dockerfile`: Docker configuration for building the backend container.
  - `nest-cli.json`: Configuration file for the NestJS CLI.
  - `.env`: Environment variables specific to the backend.

---

### 3. Setup Instructions

**Prerequisites**
- **Node.js** and **Yarn**: Required for running and managing dependencies for both frontend and backend.
- **Docker** and **Docker Compose**: Optional, but recommended for containerized deployment.

**Environment Variables**
- Example `.env` configurations for frontend and backend:
  - **Frontend**:
    - `NEXT_PUBLIC_BACKEND_URL`: Base URL for the backend API.
  - **Backend**:
    - `DATABASE_URL`: MongoDB connection string.
    - `JWT_SECRET`: Secret key for JWT authentication.

**Installing Dependencies**
1. **Frontend**: 
   - Navigate to the `frontend` directory and run:  
     ```bash
     yarn install
     ```
2. **Backend**:
   - Navigate to the `backend` directory and run:  
     ```bash
     yarn install
     ```

**Running the Application**
- **Without Docker**:
  - **Frontend**: Run `yarn dev` in the `frontend` folder.
  - **Backend**: Run `yarn start:dev` in the `backend` folder.
- **With Docker**:
  - Run `docker-compose up` from the root directory to start both frontend and backend services in Docker containers.

**Testing**
- **Frontend**: 
  - Run unit tests in the `frontend` directory with:
    ```bash
    yarn test
    ```
- **Backend**: 
  - Run unit tests in the `backend` directory with:
    ```bash
    yarn test
    ```
  - Run end-to-end tests in the `backend` directory with:
    ```bash
    yarn test:e2e
    ```

---

### 4. Usage Instructions

**Frontend Usage**
1. **Starting the Application**: 
   - Access the application by navigating to the frontend’s local development server (usually `http://localhost:3000`).
2. **Signup and Login**:
   - Navigate to `/auth/signup` to create a new account, entering all required information.
   - After successful registration, navigate to `/auth/login` to log in with the newly created credentials.

**Backend API Endpoints**
- **Authentication**:
  - **POST `/auth/signup`**: Registers a new user. Requires name, email, and password fields.
  - **POST `/auth/login`**: Logs in a user and returns a JWT token.
- **User Information**:
  - **GET `/users/me`**: Retrieves the authenticated user's information. Requires an Authorization header with the JWT token.

**Testing the Endpoints**:
- Use tools like **Postman** or **cURL** to manually test the backend endpoints, or refer to the Jest tests located in the `backend/test` directory for automated testing.

---

### 5. Testing Guide

**Frontend Testing**
- Tests are located in the `src/__tests__/` directory, covering the `LoginPage` and `SignupPage` components.
- **Running Tests**:
  - Run `yarn test` in the `frontend` directory to execute all tests.
  - To run tests in watch mode (re-running tests on file changes), use:
    ```bash
    yarn test --watch
    ```
- **Testing Tools**:
  - **Jest**: For running the test suite.
  - **React Testing Library**: For simulating user interactions and DOM assertions.

**Backend Testing**
- Tests for the backend cover both unit and end-to-end (e2e) scenarios.
- **Unit Tests**:
  - Located within `src/auth/*.spec.ts` for authentication tests and `src/users/*.spec.ts` for user service tests.
  - Run `yarn test` in the `backend` directory to execute all unit tests.
- **End-to-End Tests**:
  - Located in the `test` folder with configurations in `jest-e2e.json`.
  - Run `yarn test:e2e` in the `backend` directory to execute e2e tests, ensuring API routes and database interactions work as expected.

**Common Test Scenarios**
- **Frontend**:
  - Form validation: Ensures error messages display when inputs are invalid.
  - API call success/failure: Checks success messages and error handling.
- **Backend**:
  - Authentication flow: Tests signup and login functionality.
  - JWT protection: Verifies access restrictions on protected routes.

---

### 6. Deployment Instructions

**Docker Deployment**
1. **Build the Images**:
   - Run `docker-compose build` from the root directory to build both the frontend and backend images.
2. **Run the Containers**:
   - Execute `docker-compose up -d` to start the containers in detached mode.
3. **Access the Application**:
   - The frontend should be available at `http://localhost:3000` (or the specified Docker configuration).
   - The backend API will be accessible on `http://localhost:3001` or as specified in `docker-compose.yml`.

**Manual Deployment**
1. **Frontend**:
   - **Build**: Run `yarn build` in the `frontend` directory to generate optimized production files.
   - **Start**: Serve the application with `yarn start` or deploy the `frontend/.next` folder to a static hosting provider like Vercel.
2. **Backend**:
   - **Build**: Run `yarn build` in the `backend` directory to transpile TypeScript files.
   - **Start**: Use `yarn start:prod` to start the backend in production mode, or deploy the compiled `dist` folder to a server environment.

**Environment Variables for Production**
- Ensure `.env` files contain the correct production values:
  - **Frontend**: Update `NEXT_PUBLIC_BACKEND_URL` to point to the production backend.
  - **Backend**: Ensure values for `DATABASE_URL`, `JWT_SECRET`, and any other necessary environment variables are correctly configured.

---

### 7. Environment Configuration

**Frontend Environment Variables**
- The `frontend` application requires a `.env` file in the root directory with the following configuration:
  ```plaintext
  NEXT_PUBLIC_BACKEND_URL=http://localhost:3001   # Backend API URL for local development
  ```
  Replace `http://localhost:3001` with your backend’s production URL when deploying.

**Backend Environment Variables**
- The `backend` application also requires a `.env` file in its root directory. Key configurations include:
  ```plaintext
  DATABASE_URL=<Your MongoDB URI>             # MongoDB connection string
  JWT_SECRET=<Your JWT Secret>               # Secret key for JWT token generation
  PORT=3001                                  # Port number for the backend server
  ```
  - **DATABASE_URL**: Connection URI for MongoDB; use a service like MongoDB Atlas for cloud-hosted databases.
  - **JWT_SECRET**: Used for signing JWT tokens for secure user sessions; choose a strong, unique value.
  - **PORT**: Port number on which the backend server runs; align this with the frontend configuration.

**Notes on Environment Management**
- **Local Development**: Store sensitive information in `.env` files, which are ignored by Git via `.gitignore`.
- **Production Deployment**: Ensure all required environment variables are set on the server or hosting platform.

---

### 8. Folder Structure

Here is an overview of the folder structure for both `frontend` and `backend` components:

**Frontend Folder Structure**
```
frontend/
├── public/                    # Public assets like favicon, images
├── src/                       # Main source directory
│   ├── __tests__/             # Testing files
│   ├── app/                   # Page components and routing setup
│   │   ├── auth/              # Authentication pages (login, signup)
│   │   ├── layout.tsx         # Layout configuration for the app
│   │   └── page.tsx           # Main entry page
│   ├── components/            # UI components
│   ├── lib/                   # Utility functions and API configurations
│   ├── styles/                # Global and component-specific styles
├── .env                       # Environment variables
├── jest.config.js             # Jest configuration
├── jest.setup.ts              # Jest setup file
└── tailwind.config.js         # Tailwind CSS configuration
```

**Backend Folder Structure**
```
backend/
├── src/                       # Main source directory
│   ├── auth/                  # Authentication module
│   │   ├── dto/               # Data Transfer Objects (login/signup)
│   │   ├── guards/            # JWT authorization guards
│   │   ├── strategies/        # JWT strategy for authentication
│   │   └── services/          # Service layer for authentication logic
│   ├── users/                 # User module (models, services, controllers)
│   └── main.ts                # Main entry file for NestJS application
├── test/                      # End-to-end testing
├── .env                       # Environment variables
├── jest-e2e.json              # Jest E2E configuration
└── nest-cli.json              # NestJS CLI configuration
```

**Key Files**
- **frontend/src/app/auth/**: Contains login and signup page components.
- **backend/src/auth/**: Contains backend authentication logic, including JWT strategy, guards, and DTOs.
- **backend/test/**: Contains end-to-end tests for backend API endpoints.

---

### 9. API Documentation

The backend provides the following key API endpoints for authentication and user management:

**Authentication Endpoints**
1. **POST /auth/signup**
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "name": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     - `201 Created`: User registered successfully.
     - `400 Bad Request`: Validation errors or if email is already in use.

2. **POST /auth/login**
   - **Description**: Logs in a user and returns a JWT token.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Response**:
     - `200 OK`: Returns a JWT token if login is successful.
     - `401 Unauthorized`: Invalid credentials.

**Protected Endpoints (Require JWT)**
1. **GET /users/me**
   - **Description**: Retrieves the current user’s profile based on the JWT token.
   - **Headers**:
     - `Authorization: Bearer <token>`
   - **Response**:
     - `200 OK`: Returns the user profile.
     - `401 Unauthorized`: If no token is provided or the token is invalid.

To explore these endpoints interactively, you can use tools like **Postman** or **Swagger** (if integrated) for manual testing and validation.

---

### 10. Testing

Both the frontend and backend are tested to ensure reliability and correctness. Below is an overview of the testing strategies used for each component:

#### Frontend Testing

The frontend uses **Jest** and **React Testing Library** for testing components and pages.

- **Unit Tests**: Verify individual component functionality.
- **Integration Tests**: Test interactions between components, particularly for forms like Login and Signup.
  
**Test Files**:
- Test files are located in `frontend/src/__tests__/`.
- Examples:
  - **LoginPage.test.tsx**: Tests the login functionality and validation.
  - **SignupPage.test.tsx**: Tests the signup functionality, including error messages for invalid input.

**Running Frontend Tests**:
```bash
cd frontend
yarn test
```

This command will run all tests in the frontend, showing results for each test file.

#### Backend Testing

The backend uses **Jest** for unit and end-to-end (E2E) testing.

- **Unit Tests**: Test individual service methods and controllers.
- **E2E Tests**: Validate the API endpoints by running simulated requests to check expected responses.

**Test Files**:
- Unit test files are located in the `backend/src/` directory with a `.spec.ts` suffix.
- E2E tests are located in the `backend/test/` directory.

**Running Backend Tests**:
```bash
cd backend
yarn test            # Run all unit tests
yarn test:e2e        # Run end-to-end tests
```

These commands will execute tests, providing coverage reports and detailed feedback on each test.

---

### 11. Docker Setup

This project uses **Docker** for containerized deployment, with configurations for both frontend and backend services. A **Docker Compose** file is included to orchestrate these services.

#### Docker Configuration

- **Dockerfile**: Each component (`frontend` and `backend`) has a `Dockerfile` that specifies the base image, dependencies, and startup commands.

- **docker-compose.yml**: The `docker-compose.yml` file at the project root manages multi-container deployment, linking frontend and backend services.

**docker-compose.yml** Example:
```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    env_file:
      - backend/.env

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_BACKEND_URL: "http://backend:3001"
    depends_on:
      - backend
```

#### Building and Running Containers

1. **Build and Run**:
   ```bash
   docker-compose up --build
   ```

2. **Stopping Containers**:
   ```bash
   docker-compose down
   ```

3. **Accessing Services**:
   - **Frontend**: `http://localhost:3000`
   - **Backend**: `http://localhost:3001`

With these commands, the frontend and backend will be up and running, allowing local testing and integration of the full stack in a containerized environment.

---

### 12. Deployment

This section outlines the deployment process for production environments. Depending on your infrastructure, you can use services like **AWS**, **DigitalOcean**, **Vercel** (for frontend), and **Heroku** or **Render** (for backend).

#### Frontend Deployment

1. **Build for Production**:
   ```bash
   cd frontend
   yarn build
   ```

2. **Deploy on Vercel**:
   - Configure the **NEXT_PUBLIC_BACKEND_URL** to point to the backend production URL.
   - Connect your repository to Vercel and deploy directly.

#### Backend Deployment

1. **Build for Production**:
   ```bash
   cd backend
   yarn build
   ```

2. **Deploy on Heroku/Render/AWS**:
   - Set up environment variables in the deployment environment:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `PORT` (typically set by the host service)
   - Push the backend to your chosen hosting provider.

#### Docker-Based Deployment

Alternatively, you can deploy both frontend and backend with Docker, leveraging services like **AWS ECS**, **DigitalOcean**, or **Azure**.

- **Push Docker Images**:
  - Build and tag images for frontend and backend.
  - Push images to a container registry (e.g., Docker Hub, AWS ECR).

- **Run Containers in Production**:
  - Use the `docker-compose.yml` file as a base, modifying it as needed for production (e.g., environment variables, volume mounts).


### 13. Environment Variables

Both the frontend and backend services rely on environment variables to configure sensitive data, such as API URLs, database connections, and secrets. Ensure that these variables are correctly set before deploying or running the application.

#### Frontend Environment Variables

The frontend uses a `.env` file at the root of the `frontend` directory.

Example `.env` file for the frontend:
```plaintext
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

- **NEXT_PUBLIC_BACKEND_URL**: The URL of the backend service. Set this to the production backend URL when deploying.

#### Backend Environment Variables

The backend uses a `.env` file in the `backend` directory to store sensitive information such as the database connection string and JWT secrets.

Example `.env` file for the backend:
```plaintext
DATABASE_URL=mongodb://localhost:27017/test-exercise
JWT_SECRET=your_jwt_secret
PORT=3001
FRONTEND_URL=http://localhost:3000 
```

- **DATABASE_URL**: The MongoDB connection string.
- **JWT_SECRET**: Secret key for signing JWTs. This should be kept secure.
- **PORT**: The port the backend will run on. Ensure it matches the port in Docker Compose if using Docker.

### 14. API Endpoints

The backend API provides endpoints for authentication and user management. Here’s a brief overview of the available endpoints:

#### Authentication Endpoints

- **POST /auth/login**
  - **Description**: Logs in a user by validating credentials and returns a JWT token.
  - **Body**: `{ "email": "user@example.com", "password": "password" }`
  - **Response**: `{ "accessToken": "jwt_token" }`

- **POST /auth/signup**
  - **Description**: Registers a new user.
  - **Body**: `{ "name": "John Doe", "email": "user@example.com", "password": "Password@123" }`
  - **Response**: `{ "message": "User registered successfully" }`

- **GET /auth/profile**
  - **Description**: Retrieves the profile of the logged-in user.
  - **Headers**: `{ "Authorization": "Bearer jwt_token" }`
  - **Response**: `{ "id": "user_id", "name": "John Doe", "email": "user@example.com" }`

### 15. Common Issues and Troubleshooting

This section provides solutions to common issues that may arise during development and deployment.

#### 1. Database Connection Issues
- **Problem**: The backend fails to connect to MongoDB.
- **Solution**: Ensure that the `DATABASE_URL` in your environment file is correct and that MongoDB is running.

#### 2. JWT Authentication Fails
- **Problem**: Unauthorized errors when accessing protected routes.
- **Solution**: Verify that the JWT token is correctly set in the `Authorization` header and that the `JWT_SECRET` matches on both backend and frontend.

#### 3. Environment Variables Not Loaded
- **Problem**: Missing values in frontend or backend due to environment variables not being recognized.
- **Solution**: Double-check the `.env` files for both frontend and backend. Ensure that the files are not ignored by version control if necessary.

#### 4. Docker Compose Fails to Start
- **Problem**: Docker containers fail to start or connect with each other.
- **Solution**: Verify that the `docker-compose.yml` file is correctly set up and that all services are defined with the appropriate ports and environment variables.

### 16. Future Improvements

The following improvements can be considered to enhance the application:

- **Additional Authentication Methods**: Implement OAuth2 with providers like Google or Facebook for easier user signup and login.
- **Rate Limiting and Security**: Add rate limiting to prevent abuse of the API and secure sensitive endpoints further.
- **Improved Testing**: Increase test coverage, particularly for edge cases and E2E scenarios.
- **Frontend Optimization**: Optimize the frontend for faster load times and better performance on mobile devices.
- **CI/CD Pipeline**: Set up a CI/CD pipeline using GitHub Actions, CircleCI, or Jenkins for automated testing, building, and deployment.

