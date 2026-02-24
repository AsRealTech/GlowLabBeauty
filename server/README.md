# GlowBeauty

A full-stack web application for managing beauty products, tips, and user authentication. Built with modern technologies for a seamless experience.

PORT=5000
DATABASE_URL=
CLIENT_URL1= 
CLIENT_URL2= 
ADMIN_EMAIL=a
ADMIN_PASSWORD=
ADMIN_BOOTSTRAP_ENABLED=true
NODE_ENV=development
JWT_REFREASH_SECRET=2222222222222222222
JWT_SECRET=wwwwwwwwwwww33333

## Features

- **User Authentication**: Secure login/registration with JWT and cookies.
- **Product Management**: Add, update, delete, and view beauty products.
- **Tips & Insights**: Fetch and display beauty tips.
- **Responsive Dashboards**: Multiple client interfaces (React and TypeScript versions).
- **API-Driven**: RESTful API with database integration (Drizzle ORM).
- **Real-Time Updates**: Interactive UI with state management.

## Tech Stack

- **Frontend**:
  - Client: React 18, Vite, React Bootstrap, Axios
  - Clienty: React 18 (TypeScript), Vite, Axios
- **Backend**: Node.js, Express.js, Drizzle ORM, SQLite/PostgreSQL
- **Authentication**: JWT, bcrypt
- **Deployment**: Vite for builds, Node for server

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

### Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd glowlabbeaut
   ```

2. **Install Dependencies for All Parts**:
   - **Server**:
     ```bash
     cd server
     npm install
     ```
   - **Client**:
     ```bash
     cd ../client
     npm install
     ```
   - **Clienty** (TypeScript version):
     ```bash
     cd ../clienty
     npm install
     ```

3. **Environment Setup**:
   - **Server**: Create `.env` in `server/` with database URL, JWT secret, etc.
   - **Clients**: Create `.env` in `client/` and `clienty/` with `VITE_API_URL=http://localhost:5000/api`.

4. **Database Setup** (Server):
   ```bash
   cd server
   npm run db:generate  # Generate migrations
   npm run db:migrate   # Run migrations
   npm run db:seed      # Seed data (if available)
   ```

5. **Start the Application**:
   - **Server**:
     ```bash
     cd server
     npm start
     ```
     - Runs on `http://localhost:5000`
   - **Client**:
     ```bash
     cd ../client
     npm run dev
     ```
     - Runs on `http://localhost:3000`
   - **Clienty**:
     ```bash
     cd ../clienty
     npm run dev
     ```
     - Runs on `http://localhost:3001` (adjust port if needed)

## Usage

- **Access Clients**: Open the client URLs in your browser.
- **Login**: Use `/login` to authenticate.
- **Dashboard**: Manage products, view tips, and user data.
- **API Testing**: Use tools like Postman for endpoints (see server README).

## Project Structure

```
glowlabbeaut/
├── client/           # React client (JavaScript)
│   ├── src/
│   ├── package.json
│   └── README.md     # Detailed client docs
├── clienty/          # React client (TypeScript)
│   ├── src/
│   ├── package.json
│   └── README.md
├── server/           # Node.js backend
│   ├── routes/
│   ├── config/
│   ├── drizzle/
│   ├── package.json
│   └── README.md
└── README.md         # This file
```

## API Overview

- **Base URL**: `http://localhost:5000/api`
- **Auth**: `POST /auth/login`, `GET /me`
- **Products**: `GET /products`, `POST /add/products`, `PUT /update/products`, `DELETE /del/product/:id`
- **Tips**: `GET /tips`

Full API docs in `server/README.md`.

## Contributing

1. Fork the repo.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add feature'`.
4. Push: `git push origin feature/your-feature`.
5. Open a PR.

## Scripts

- **Server**: `npm start` (dev), `npm run build` (prod)
- **Clients**: `npm run dev`, `npm run build`

## License

MIT License. See LICENSE for details.

## Contact

For issues or questions, open a GitHub issue or contact the maintainers.