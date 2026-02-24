# GlowBeauty Client

A modern React-based frontend for the GlowBeauty application, built with Vite for fast development and optimized builds.

## Features

- **User Authentication**: Secure login and registration with JWT-based auth.
- **Dashboard**: Interactive dashboard with product management, tips, and user data.
- **Responsive UI**: Built with React Bootstrap and Feather Icons for a clean, mobile-friendly interface.
- **API Integration**: Axios-based API calls with cookie-based authentication.
- **State Management**: Custom hooks for auth and context providers.
- **Routing**: React Router for client-side navigation.

## Tech Stack

- **Frontend**: React 18, Vite
- **UI Library**: React Bootstrap, Feather Icons
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Language**: JavaScript/TypeScript (mixed)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd glowlabbeaut/client
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Copy `.env.example` to `.env` (if available) or create one.
   - Set the following variables:
     ```
     VITE_API_URL=http://localhost:5000/api
     VITE_APP_VERSION=v1.0.0
     GENERATE_SOURCEMAP=false
     PUBLIC_URL=
     VITE_APP_BASE_NAME=
     ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Login**: Navigate to `/login` to authenticate.
- **Dashboard**: Access `/dashboard` after login for main features.
- **Products**: Manage products via protected routes.
- **Build for Production**:
  ```bash
  npm run build
  npm run preview
  ```

## Project Structure

```
client/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── config/      # Axios and auth config
│   ├── contexts/    # React contexts
│   ├── hooks/       # Custom hooks (e.g., useAuth)
│   ├── layouts/     # Layout components (Admin, Guest)
│   ├── routes/      # Routing configuration
│   ├── store/       # State management
│   ├── utils/       # Utility functions
│   ├── views/       # Page components (auth, dashboard, etc.)
│   └── index.jsx    # App entry point
├── package.json
├── vite.config.mjs
└── README.md
```

## API Endpoints

The client communicates with the backend server (default: `http://localhost:5000/api`). Key endpoints include:
- `POST /auth/login` - User login
- `GET /me` - Fetch current user
- `GET /products` - Fetch products
- `POST /add/products` - Add product

Ensure the server is running for full functionality.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to branch: `git push origin feature/your-feature`.
5. Open a pull request.

## Environment Variables

| Variable          | Description                  | Default |
|-------------------|------------------------------|---------|
| VITE_API_URL     | Backend API base URL        | http://localhost:5000/api |
| VITE_APP_VERSION | App version                 | v1.0.0 |
| GENERATE_SOURCEMAP | Generate source maps       | false  |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License. See LICENSE for details.

## Contact

For questions or support, reach out to the development team. 