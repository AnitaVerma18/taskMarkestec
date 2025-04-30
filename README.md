# TaskMarkestec

A backend server application built with Node.js and TypeScript that handles user authentication, product management, and airport data operations. It uses Express.js, MongoDB (via Mongoose), and JWT for secure API handling.

## Features

- User authentication and management
- Product APIs under user context
- Airport data APIs
- Environment-based configuration using `.env`
- MongoDB integration
- Modular route structure

## Technologies Used

- **Node.js**
- **TypeScript**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Bcrypt** for password hashing
- **Moment.js** for date handling
- **Dotenv** for environment variables
- **CORS** for cross-origin resource sharing

## Project Structure

```
/src
  └── modules
      ├── auth          # Authentication logic and routes
      ├── bootstrap     # Initial setup routes
      ├── product       # Product-related API logic
      └── airport       # Airport-related API logic
server.ts              # Entry point
```

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB instance

### Installation

```bash
git clone <repo-url>
cd TaskMarkestec
npm install
```

### Configuration

Create a `.env` file in the root directory with the following:

```
PORT=3000
URI=mongodb://localhost:27017/your-db
SECRET_KEY=your_jwt_secret
SALT_ROUND= 10
```

### Build and Run

```bash
npm run build
npm start
```

The server will run on the port defined in `.env`.

## Available Scripts

- `npm run build`: Compiles TypeScript files to JavaScript
- `npm start`: Runs the compiled server
- `npm test`: Placeholder for tests

## License

ISC License
