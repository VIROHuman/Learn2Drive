# Learn2Drive Academy - Landing Page

**Client-Server Architecture:** React.js (Vite) frontend + Node.js (Express) backend

## 🏗️ Architecture

- **Frontend:** React 19 with Vite
- **Backend:** Node.js with Express
- **Styling:** Tailwind CSS
- **TypeScript** throughout

## 📁 Folder Structure

```
learn2drive-main/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # UI components (Button, Card, Badge, Input)
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   ├── lib/
│   │   │   └── utils.ts    # Utility functions
│   │   ├── App.tsx         # Main landing page component
│   │   ├── main.tsx        # React entry point
│   │   └── index.css       # Tailwind styles
│   ├── public/             # Static assets (images)
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── server/                 # Express backend
    ├── index.ts            # Express server
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

1. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Set up server environment variables:**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Update `.env` if needed (default PORT is 5000).

### Running the Application

**Development Mode:**

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173` (or another port if 5173 is taken)

**Production Mode:**

1. **Build the client:**
   ```bash
   cd client
   npm run build
   ```

2. **Build the server:**
   ```bash
   cd server
   npm run build
   ```

3. **Start the server:**
   ```bash
   cd server
   npm start
   ```

## 📚 Key Features

### Frontend (React + Vite)
- **Modern React:** Using React 19 with hooks
- **Vite:** Fast build tool and dev server
- **Tailwind CSS:** Utility-first CSS framework
- **TypeScript:** Type-safe development
- **Component-based:** Reusable UI components

### Backend (Node.js + Express)
- **Express:** Fast, minimalist web framework
- **CORS:** Enabled for cross-origin requests
- **TypeScript:** Type-safe server code
- **RESTful API:** Ready for future endpoints

## 🎯 Available Routes

### Frontend Routes
- `/` - Landing page (main page)

### Backend API Routes
- `GET /` - API information
- `GET /api/health` - Health check endpoint
- `GET /api/featured` - Example featured courses endpoint

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend Framework:** Express.js
- **Runtime:** Node.js

## 📝 Scripts

### Client Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Server Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

## 🎨 Styling

The project uses Tailwind CSS with custom configuration matching the original Next.js project:
- Custom color palette (brand orange: `#c83d18`, brand blue: `#79afce`)
- Dark mode support
- Custom animations and transitions
- Responsive design utilities

## 📦 Dependencies

### Client Dependencies
- `react` & `react-dom` - React framework
- `lucide-react` - Icon library
- `clsx` & `tailwind-merge` - Utility functions for className management
- `class-variance-authority` - Component variant management
- `tailwindcss-animate` - Tailwind animation plugin

### Server Dependencies
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variable management

## 🔄 Migration Notes

This project was migrated from Next.js 15 to a separated Client-Server architecture:

**What was migrated:**
- Landing page (`src/app/(public)/page.tsx` → `client/src/App.tsx`)
- Navbar component
- Footer component
- UI components (Button, Card, Badge, Input)
- Tailwind CSS configuration and styles
- Public assets (images)

**What was removed:**
- Authentication (NextAuth)
- Dashboard routes (Admin, Instructor, Student)
- Database logic (Prisma)
- Server Actions
- Middleware

**Changes made:**
- Replaced `next/image` with standard `<img>` tags
- Replaced `next/link` with standard `<a>` tags
- Removed "use client" directives
- Converted to standard React components

## 🤝 Contributing

This is a template project. Customize it for your specific needs!

## 📄 License

MIT
