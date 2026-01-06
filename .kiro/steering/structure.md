# Project Structure & Organization

## Root Directory Structure
```
├── src/                    # Source code
├── public/                 # Static assets
├── dist/                   # Build output
├── .firebase/              # Firebase deployment cache
├── node_modules/           # Dependencies
├── .env                    # Environment variables
├── firebase.json           # Firebase configuration
├── vite.config.js          # Vite build configuration
└── package.json            # Project dependencies and scripts
```

## Source Code Organization (`src/`)

### Main Application Files
- `main.jsx` - Application entry point with router setup
- `App.jsx` - Root component (currently minimal)
- `index.css` - Global styles

### Component Architecture (`src/Components/`)
Components are organized by feature in PascalCase folders:
- `AvailableFoods/` - Food listing and browsing
- `FoodDetails/` - Individual food item details and request modals
- `Home/` - Landing page components
- `Login/` & `Register/` - Authentication forms
- `Navbar/` & `Footer/` - Layout components
- `Managefood/` - Food management for donors
- `MyrequestItem/` - User's food requests tracking
- `Privateroute/` - Route protection wrapper

### Pages (`src/Page/`)
Reusable page-level components:
- `AddFood.jsx` - Food donation form
- `Errorpage.jsx` - 404 error handling
- `FeatureFood.jsx`, `Heropage.jsx`, `Mission.jsx` - Landing page sections
- `Skeleton.jsx`, `Spinner.jsx` - Loading states

### Context & State (`src/context/`)
- `AuthProvider.jsx` - Firebase authentication provider
- `Authcontext.jsx` - Authentication context definition
- `AuthLoader.jsx` - Authentication loading wrapper

### Configuration (`src/Firebase/`)
- `Firebase.init.js` - Firebase initialization and configuration

### Layout (`src/layout/`)
- Layout components for consistent page structure

## Naming Conventions
- **Components**: PascalCase folders and files (`FoodDetails/FoodDetails.jsx`)
- **Pages**: PascalCase files in `Page/` directory
- **Context**: PascalCase with descriptive names
- **Assets**: kebab-case for images (`hero-food-sharing.jpg`)

## File Organization Patterns
- Each major component has its own folder
- Related components grouped together (e.g., `FoodDetails/` contains detail view and request modal)
- Debug logs present in component folders (development artifacts)
- Context providers separated from component logic
- Firebase configuration isolated in dedicated folder

## Route Structure
- `/` - Home page
- `/register`, `/login` - Authentication
- `/availablefoods` - Protected food browsing
- `/addfoods` - Food donation form
- `/food/:id` - Individual food details
- `/foodRequests` - Protected user requests
- `/manage-foods` - Protected food management