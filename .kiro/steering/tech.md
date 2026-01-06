# Technology Stack & Build System

## Frontend Stack
- **Framework**: React 19.2.0 with Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.17 + DaisyUI 5.4.7
- **Routing**: React Router DOM 7.9.5
- **State Management**: React Context API + React Query 5.90.8
- **Forms**: React Hook Form 7.66.0
- **Animations**: Motion 12.23.24 (Framer Motion)
- **Icons**: Lucide React 0.553.0
- **HTTP Client**: Axios 1.13.2
- **Notifications**: React Toastify 11.0.5

## Authentication & Backend Services
- **Authentication**: Firebase 12.5.0 (Email/Password + Google OAuth)
- **Image Hosting**: imgbb API
- **Deployment**: Firebase Hosting + Netlify

## Development Tools
- **Build Tool**: Vite with React plugin
- **Linting**: ESLint 9.39.1 with React hooks plugin
- **Module System**: ES Modules (type: "module")

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Firebase Deployment
```bash
firebase deploy      # Deploy to Firebase hosting
```

## Environment Variables
Required environment variables (stored in `.env`):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Build Configuration
- Vite config includes React plugin and Tailwind CSS plugin
- Firebase hosting configured for SPA with rewrites to `/index.html`
- Public directory serves static assets