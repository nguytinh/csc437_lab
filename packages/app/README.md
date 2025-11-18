# Gaming Hub - Single Page Application

This is a single-page application (SPA) for browsing gaming content, built with Lit and TypeScript.

## Project Structure

```
app/
├── public/
│   ├── styles/          # Global CSS files
│   └── icons/           # SVG icon sprites
├── src/
│   ├── components/      # Reusable components
│   │   ├── gaming-header.ts
│   │   └── login-form.ts
│   ├── views/          # Page-level view components
│   │   ├── home-view.ts
│   │   ├── games-view.ts
│   │   ├── game-view.ts
│   │   ├── consoles-view.ts
│   │   ├── genres-view.ts
│   │   ├── publishers-view.ts
│   │   ├── series-view.ts
│   │   └── players-view.ts
│   ├── styles/         # TypeScript CSS modules
│   │   └── reset.css.ts
│   └── main.ts         # Application entry point with router
├── index.html          # Main SPA HTML file
├── login.html          # Separate login page
├── package.json
├── tsconfig.json
└── vite.config.js      # Vite configuration with API proxy
```

## Features

- **Client-side routing** using `@calpoly/mustang`'s Switch component
- **No page reloads** when navigating between views
- **Deep linking** support - any URL can be loaded directly
- **Authentication** with protected routes
- **Dark/Light mode** toggle
- **Responsive design** for mobile, tablet, and desktop

## Routes

- `/` → Redirects to `/app`
- `/app` → Home/landing page
- `/app/games` → Games collection view
- `/app/games/:id` → Individual game detail view
- `/app/consoles` → Consoles view
- `/app/genres` → Genres view
- `/app/publishers` → Publishers view
- `/app/series` → Series view
- `/app/players` → Players view

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
- **@calpoly/mustang** - Framework utilities for routing, auth, and history
- **Vite** - Fast build tool with HMR
- **Express** - Backend API server

## Notes

- The login page (`login.html`) is kept separate from the SPA for security and reliability
- The Express server uses a catch-all route for `/app/*` to serve `index.html`, enabling deep linking
- API requests are authenticated using JWT tokens stored in localStorage

