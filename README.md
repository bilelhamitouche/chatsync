# ChatSync - Real-time Messaging Application

ChatSync is a real-time messaging application built with a modern tech stack featuring React, NestJS, and Socket.IO for seamless communication.

## Features

- 🔐 User authentication (registration, login, JWT-based sessions)
- 💬 Real-time messaging with Socket.IO
- 👥 Chat room creation and management
- 📱 Responsive UI built with Chakra UI
- ☁️ Image uploads via Cloudinary integration
- 🗃️ Database persistence with PostgreSQL and Drizzle ORM
- 🛡️ Secure password hashing with bcrypt
- 🎨 Custom theming with Next-Themes
- 🔍 Advanced querying with TanStack Query
- 🧭 Type-safe routing with TanStack Router

## Tech Stack

### Frontend (Client)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Real-time Communication**: Socket.IO Client
- **Form Handling**: TanStack Form
- **Date Utilities**: Date-fns
- **Icons**: React Icons
- **Validation**: Zod
- **Linting**: ESLint
- **Code Formatting**: Prettier

### Backend (Server)

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT (access & refresh tokens) with Passport.js
- **Real-time Communication**: Socket.IO Gateway
- **File Storage**: Cloudinary integration
- **Validation**: Class Validator & Class Transformer
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier
- **TypeScript**: Strict mode enabled

## Project Structure

```
chatsync/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API queries and mutations
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries (socket, router, types)
│   │   ├── routes/        # Application routes
│   │   ├── utils/         # Utility functions
│   │   └── main.tsx       # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
└── server/                # Backend NestJS application
    ├── src/
    │   ├── auth/          # Authentication module
    │   ├── chats/         # Chat management module
    │   ├── messages/      # Real-time messaging module
    │   ├── users/         # User management module
    │   ├── database/      # Database connection and schema
    │   ├── cloudinary/    # Cloudinary integration
    │   ├── common/        # Shared constants and decorators
    │   ├── app.module.ts  # Root module
    │   └── main.ts        # Entry point
    ├── test/              # Test files
    ├── jest.config.js     # Jest configuration
    └── package.json       # Backend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)
- PostgreSQL database
- Cloudinary account (for image uploads)

### Environment Variables

Create `.env` files in both `client/` and `server/` directories:

#### Client (.env)

```
VITE_API_URL=http://localhost:8000/api
```

#### Server (.env)

```
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/chatsync
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd chatsync
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd client
pnpm install

# Install backend dependencies
cd ../server
pnpm install
```

3. Set up the database:

```bash
# Generate database schema
pnpm db:generate

# Run migrations
pnpm db:migrate
```

4. Start the development servers:

```bash
# Start backend server (in server directory)
pnpm start:dev

# Start frontend client (in client directory)
pnpm dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Users

- `GET /api/users/profile` - Get current user profile
- `PATCH /api/users/profile` - Update user profile
- `PATCH /api/users/password` - Update password
- `DELETE /api/users/account` - Delete account

### Chats

- `GET /api/chats` - Get user's chats
- `POST /api/chats` - Create new chat
- `GET /api/chats/:id` - Get chat by ID
- `PATCH /api/chats/:id` - Update chat
- `DELETE /api/chats/:id` - Delete chat

### Messages

- `GET /api/messages?chatId=:id` - Get messages for a chat
- `POST /api/messages` - Send new message
- `PATCH /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

## Real-time Events

Socket.IO events for real-time communication:

### Client to Server

- `join_chat` - Join a chat room
- `leave_chat` - Leave a chat room
- `send_message` - Send a new message

### Server to Client

- `receive_message` - Receive a new message
- `user_typing` - User typing indicator
- `user_stopped_typing` - User stopped typing

## Development Scripts

### Client

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

### Server

- `pnpm start:dev` - Start development server with hot reload
- `pnpm start:prod` - Start production server
- `pnpm build` - Build for production
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint with fix
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage
- `pnpm db:generate` - Generate database schema
- `pnpm db:migrate` - Run database migrations

## Deployment

### Frontend (Vercel)

The frontend is configured for easy deployment to Vercel:

1. Push to GitHub repository
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend

The backend can be deployed to any Node.js hosting service:

1. Set up environment variables
2. Run `pnpm build` to compile TypeScript
3. Start server with `pnpm start:prod`

## License

This project is licensed under the UNLICENSED license - see server/package.json for details.

## Acknowledgments

- [React](https://react.dev) - The React library for web and native user interfaces
- [Passportjs](https://passportjs.org) - Simple, unobstructive authentication for Nodejs
- [Chakra UI](https://chakra-ui.com) - Component system for building systems with speed
- [Tanstack Router](https://tanstack.com/router) - Type-safe router for React
- [Tanstack Query](https://tanstack.com/query) - Data fetching and state management
- [Nest.js](https://nestjs.com) - The progressive Nodejs framework for building scalable applications
- [Socket.io](https://socket.io) - Bidirectional and low-latency communication for every platform

