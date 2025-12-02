# Gaming Hub - Single Page Application

This is a single-page application (SPA) for browsing gaming content, built with Lit, TypeScript, and the MVU (Model-View-Update) architecture.

## Project Structure

```
app/
├── public/
│   ├── styles/          # Global CSS files
│   └── icons/           # SVG icon sprites
├── src/
│   ├── components/      # Reusable components
│   │   ├── gaming-header.ts
│   │   ├── gaming-footer.ts
│   │   └── login-form.ts
│   ├── views/          # Page-level view components
│   │   ├── home-view.ts
│   │   ├── games-view.ts          # Slideshow display
│   │   ├── games-list-view.ts     # Editable games list
│   │   ├── game-view.ts
│   │   ├── game-detail-view.ts    # Static game details
│   │   ├── game-edit-view.ts      # Edit game form
│   │   ├── consoles-view.ts
│   │   ├── genres-view.ts
│   │   ├── publishers-view.ts
│   │   ├── series-view.ts
│   │   └── players-view.ts
│   ├── styles/         # TypeScript CSS modules
│   │   └── reset.css.ts
│   ├── model.ts        # MVU Model definition
│   ├── messages.ts     # MVU Message types
│   ├── update.ts       # MVU Update function
│   └── main.ts         # Application entry point with router
├── index.html          # Main SPA HTML file
├── login.html          # Separate login page
├── newuser.html        # Separate signup page
├── package.json
├── tsconfig.json
└── vite.config.js      # Vite configuration with API proxy
```

## Features

- **MVU Architecture** - Centralized state management using Model-View-Update pattern
- **Client-side routing** using `@calpoly/mustang`'s Switch component
- **No page reloads** when navigating between views
- **Deep linking** support - any URL can be loaded directly
- **Authentication** with protected routes and JWT tokens
- **Dark/Light mode** toggle with persistent preference
- **Responsive design** for mobile, tablet, and desktop
- **Interactive slideshow** on games page with auto-play
- **Editable game data** - Update title, description, href, and image URLs
- **Card-based layouts** for all collection pages

## Routes

- `/` → Redirects to `/login.html`
- `/app` → Home/landing page
- `/app/games` → Games slideshow view
- `/app/games-list` → Editable games list (with edit buttons)
- `/app/games-list/:id/edit` → Edit game form
- `/app/games/:id` → Individual game detail view (static)
- `/app/consoles` → Consoles collection view
- `/app/consoles/:id` → Individual console detail view (static)
- `/app/genres` → Genres collection view
- `/app/publishers` → Publishers collection view
- `/app/series` → Series collection view
- `/app/players` → Players collection view

## Development

### Prerequisites

- Node.js installed
- MongoDB running (for the API)
- Express server configured

### Running in Development Mode

1. Start the app with Vite dev server (with HMR):
   ```bash
   cd packages/app
   npm run dev
   ```

2. In a separate terminal, start the Express API server:
   ```bash
   cd packages/server
   npm run start
   ```

3. Access the app at `http://localhost:5173`

The Vite dev server is configured to proxy API requests to the Express server at `localhost:3000`.

### Building for Production

```bash
npm run build
```

This will:
1. Compile TypeScript files
2. Bundle the application with Vite
3. Output to the `dist/` directory

### Serving in Production

To serve the built SPA from the Express server:

```bash
cd packages/server
npm run start:app
```

Then access the app at `http://localhost:3000`

## Key Technologies

- **Lit** - Web components library
- **TypeScript** - Type-safe JavaScript
- **@calpoly/mustang** - Framework utilities for routing, auth, history, and MVU state management
- **Vite** - Fast build tool with HMR
- **Express** - Backend API server
- **MongoDB** - Database for storing game data

## MVU Architecture

The app uses the Model-View-Update (MVU) pattern for state management:

- **Model** (`model.ts`) - Single source of truth for application state
- **Messages** (`messages.ts`) - Type-safe actions dispatched by views
- **Update** (`update.ts`) - Pure function that processes messages and updates the model
- **Store** - Centralized store (`mu-store`) that all views observe

This architecture ensures:
- Predictable state updates
- Single source of truth
- Separation of concerns between views and business logic
- Type-safe message passing

## Notes

- The login and signup pages (`login.html`, `newuser.html`) are kept separate from the SPA for security and reliability
- Both auth pages are always in dark mode for consistency
- The Express server uses a catch-all route for `/app/*` to serve `index.html`, enabling deep linking
- API requests are authenticated using JWT tokens stored in localStorage
- The root path (`/`) redirects to `/login.html` for unauthenticated users
- Game data can be edited through the `/app/games-list` interface, which uses `<mu-form>` and MVU for state management