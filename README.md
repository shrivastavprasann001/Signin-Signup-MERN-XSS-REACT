# User Authentication System

This project is a user authentication system built with the MERN stack (MongoDB, Express, React, Node.js). It uses JWT for authentication, bcrypt for password hashing, and implements several security features to ensure a safe and secure application.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Usage](#usage)
   - [Register a New User](#register-a-new-user)
   - [Login](#login)
5. [Security Features](#security-features)
   - [Input Validation and Sanitization](#input-validation-and-sanitization)
   - [Password Hashing](#password-hashing)
   - [JWT Authentication](#jwt-authentication)
   - [XSS Protection](#xss-protection)
6. [API Endpoints](#api-endpoints)
7. [Additional Notes](#additional-notes)

## Overview

This project demonstrates how to create a secure and efficient user authentication system using the MERN stack. It includes features like user registration, login, and JWT-based authentication. Additionally, the project employs security measures such as input validation, password hashing, and protection against XSS attacks.

## Prerequisites

Before you begin, ensure you have the following installed:

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

### XSS Protection

#### Backend

- **helmet**: Helmet helps secure your Express apps by setting various HTTP headers.

  Installation:

  ```bash
  npm install helmet
  ```
- **XSS clean**:  Middleware to sanitize user input and prevent XSS attacks.

  Installation:

  ```bash
  npm install xss-clean
  ```
#### Frontend

- **DOMPurify**:  Used to sanitize any HTML content before rendering it in the browser, ensuring that any embedded scripts or malicious content are removed.

-   Installation:

    ```bash
    npm install dompurify
   ```

## API Endpoints

### Authentication

- **Register User**

    ```bash
    POST /api/auth/register
   ```

-  **Login User**

  ```bash
    POST /api/auth/login
   ```

## Additional Notes

 -Ensure MongoDB is running and the URI in the .env file is correct.
 -This project uses dotenv for environment variables. Make sure to create a .env file in the Backend directory.
 -Always keep your dependencies up to date to avoid vulnerabilities.

