# PlateShare - Complete Requirements Specification

## 1. Global UI & Design Rules
- Maximum 3 primary colors (+ optional neutral)
- Support Light & Dark mode with proper text-background contrast
- Maintain consistent layout, spacing, padding, and alignment across all pages
- Cards, buttons, and reusable components must have consistent size, border radius, and style
- Forms must include validation, error messages, success states, and loaders/skeletons
- Fully responsive for mobile, tablet, and desktop, touch-friendly interactions
- No placeholder or dummy content. UI must be professional and portfolio-ready

## 2. Home / Landing Page

### Navbar Requirements
- Full-width background matching primary/secondary colors
- **Logged-out state**: minimum 3 routes (Home, Available Foods, Login/Register)
- **Logged-in state**: minimum 5 routes (Home, Available Foods, Add Food, My Requests, Manage Foods)
- Protected routes appear after login in navbar or dropdown
- At least 1 advanced menu (dropdown, profile menu, etc.)
- Sticky/fixed navbar
- Fully responsive with mobile hamburger menu

### Hero / Carousel Section
- Max height 60–70% of screen
- Interactive (slider, CTA, animation, auto/manual control)
- Clear visual hint to scroll to next section
- Food sharing theme with compelling messaging

### Landing Page Sections (Minimum 10)
Must include meaningful sections relevant to food sharing:
1. **Hero/Banner** - Main call-to-action
2. **Features** - Key platform benefits
3. **How It Works** - Step-by-step process
4. **Featured Foods** - Highlighted available items
5. **Statistics** - Impact metrics (food saved, users helped)
6. **Mission Statement** - Community impact focus
7. **Testimonials** - User success stories
8. **Categories** - Types of food shared
9. **Newsletter Signup** - Community engagement
10. **Call-to-Action** - Join the movement

### Footer Requirements
- Fully functional footer with working links only
- Contact information and social media links
- Navigation links, legal pages, support links
- Consistent with overall design theme

## 3. Core Listing / Card Section (Available Foods)

### Card Requirements
Each food card must include:
- **Image**: Food photo with proper aspect ratio
- **Title**: Food name/description
- **Short description**: Brief details about the food
- **Meta info**: Expiry date, quantity, location, donor name
- **"View Details" button**: Clear call-to-action

### Card Design Rules
- Same height, same width, same border radius across all cards
- **Desktop**: 4 cards per row preferred
- **Tablet**: 2-3 cards per row
- **Mobile**: 1-2 cards per row
- Skeleton loader or spinner during loading states
- Hover effects and smooth transitions

## 4. Details Page (Food Details)

### Accessibility & Content
- **Publicly accessible** (no login required for viewing)
- Multiple images/media support
- Professional layout with clear information hierarchy

### Required Sections
- **Overview/Description**: Detailed food information
- **Key Information**: Expiry date, quantity, pickup location, dietary info
- **Donor Information**: Contact details, pickup instructions
- **Additional Notes**: Special instructions or requirements
- **Related Items**: Other available foods from same donor or category

## 5. Listing / Explore Page (Available Foods)

### Core Features
- **Public access** - viewable without login
- **Search bar** - text-based food search
- **Filters**: Minimum 2 fields required:
  - Food category (fruits, vegetables, prepared meals, etc.)
  - Location/area
  - Additional optional: expiry date, quantity
- **Sorting options**: Date added, expiry date, location
- **Pagination or infinite scroll**
- **Fully functional** filter and search with real-time results

## 6. Authentication & Authorization

### Login/Register Pages
- Functional forms with validation & error handling
- **Demo user credential button** for easy testing
- **Social login** (Google OAuth via Firebase)
- Clean, professional UI matching design system
- Success/error states with proper messaging

### Security Features
- Protected routes using PrivateRoute component
- Firebase authentication integration
- Proper session management
- Logout functionality

## 7. Dashboard (Role-Based)

### Dashboard Layout Requirements
- **Dedicated dashboard layout** separate from public layout
- **Top navbar** with profile dropdown (Profile, Dashboard Home, Logout)
- **Sidebar navigation** with role-appropriate menu items

### User Role Dashboard (Minimum 2 menu items)
- **My Foods** - Manage posted food items
- **My Requests** - Track food requests made
- **Add Food** - Create new food donations
- **Profile** - Edit user information

### Dashboard Overview Page
- **Overview cards** showing key metrics (foods posted, requests made, etc.)
- **Dynamic charts** (Bar, Line, Pie) with real backend data
- **Dynamic data table** populated from backend (recent activities)

### Profile Page
- **Full-width layout** within dashboard
- **Editable profile information** (name, email, location, bio)
- **Readable format** when not editing
- Form validation and success/error states

## 8. Additional Pages (Minimum 2-3)

Required additional pages with consistent design:
- **About Us** - Mission, vision, team information
- **Contact** - Contact form, location, support information
- **How It Works** - Detailed guide for using the platform
- **Privacy Policy** - Data handling and privacy terms
- **Terms of Service** - Usage terms and conditions

## 9. UX, Responsiveness & Accessibility

### Content Standards
- **No placeholder text or dummy content** - all content must be meaningful
- Professional, portfolio-ready quality throughout
- Consistent typography and visual hierarchy

### Responsive Design
- **Fully responsive** on all devices (mobile, tablet, desktop)
- **Balanced section spacing** with proper visual rhythm
- **Touch-friendly interactions** with adequate tap targets
- **Mobile-first approach** with progressive enhancement

### Functionality Requirements
- **All buttons, routes, and links must be clickable** and functional
- **Dark mode support** with proper text-background contrast
- **Loading states** for all async operations
- **Error handling** with user-friendly messages
- **Accessibility compliance** (ARIA labels, keyboard navigation)

## Implementation Priority
1. Authentication system and protected routes
2. Core food listing and details pages
3. Dashboard with CRUD operations
4. Landing page with all required sections
5. Additional pages and polish
6. Responsive design and accessibility
7. Dark mode implementation and testing