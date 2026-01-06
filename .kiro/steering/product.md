# PlateShare - Community Food Sharing Platform

PlateShare is a React-based food sharing application that connects community members to reduce food waste. Users can donate surplus food, browse available items, and request food from others.

## Core Features
- User authentication via Firebase (email/password and Google OAuth)
- Food donation posting with image uploads (imgbb hosting)
- Public food browsing and detailed food views
- Food request system with donor approval workflow
- Personal food management (edit/delete donations)
- Request tracking for users

## User Roles
- **Donors**: Users who post food items for sharing
- **Recipients**: Users who request available food items
- **General Users**: Can browse available foods without authentication

## Key Workflows
1. **Food Donation**: Authenticated users add food with details and images
2. **Food Discovery**: Public browsing of available food items
3. **Request Process**: Users request food → donors approve/reject → coordination
4. **Management**: Users manage their posted foods and track requests