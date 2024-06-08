# User Authentication System

This project is a user authentication system built with the MERN stack (MongoDB, Express, React, Node.js). It uses JWT for authentication, bcrypt for password hashing, and express-validator for input validation and sanitization.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

### Backend Setup

1. **Navigate to the Backend directory:**

   ```bash
   cd Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `Backend` directory with the following content:

   ```env
   SECRETKEY=your_secret_key
   MONGO_URI=your_mongodb_uri
   ```

4. **Run the server:**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend directory:**

   ```bash
   cd Frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the React application:**

   ```bash
   npm start
   ```

## Usage

### Register a New User

- Navigate to `/signup` to register a new user. Provide a valid username, email, and password.

### Login

- Navigate to `/signin` to login. Provide the registered email and password. If the credentials are correct, a JWT token will be generated and stored in local storage.

## Security Features

### Input Validation and Sanitization

- `express-validator` is used to validate and sanitize user inputs to prevent XSS and injection attacks.

### Password Hashing

- `bcrypt` is used to hash passwords before storing them in the database.

### JWT Authentication

- `jsonwebtoken` is used to create and verify JWT tokens for user authentication.

## Additional Notes

- Ensure MongoDB is running and the URI in the `.env` file is correct.
- This project uses `dotenv` for environment variables. Make sure to create a `.env` file in the `Backend` directory.

## License

This project is licensed under the MIT License.
