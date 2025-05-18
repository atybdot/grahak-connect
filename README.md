# Grahak-connect

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **Node.js** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality

## Getting Started

First, install the dependencies:

```bash
pnpm install
```
## Database Setup

This project uses PostgreSQL with Prisma.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/server/.env` file with your PostgreSQL connection details.

3. Generate the Prisma client and push the schema:
```bash
pnpm db:push
```


Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
grahak-connect/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Hono, NONE)
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
- `pnpm check`: Run Biome formatting and linting

  ---
  # 🤖 AI Customer Support Platform

An AI-powered multilingual customer support system delivering human-like conversational experiences with seamless tool integration, real-time safeguarding, and a user-friendly interface for businesses of all sizes.

---

## 🧠 Built With

- **Gemini 2.5 Flash** – LLM and tool calling  
- **Gemini 1.5 Flash** – Safety and content safeguarding  
- **Next.js** – Frontend  
- **Hono** – Backend API framework  
- **AI SDK** – Tool calling interface  
- **JWT** – Basic authentication  

---

## 🔧 Monorepo Structure

```
📦 ai-customer-support/
├── apps/
│   ├── api/          # Dummy APIs to retrieve data and perform operations
│   ├── server/       # Core backend logic and orchestrates AI services
│   └── web/          # Frontend built with Next.js
├── .gitignore        # Git ignored files
├── package.json      # Project metadata and scripts
├── README.md         # Project overview and setup guide
└── tsconfig.json     # Shared TypeScript config
```
---

## 📚 Key Features

- 🤖 Human-like AI chat experience powered by Gemini Flash  
- 🛡️ Real-time prompt safeguarding with Gemini 1.5  
- 🌍 Multilingual support including English and various Indian regional languages  
- 📱 User-friendly mobile and web interfaces  
- 🧰 Easy onboarding for small businesses  
- 🔌 Tool calling capabilities for backend operations  
- 🔐 JWT-based basic authentication  

---

## 🚀 How It Works

1. User enters a prompt via the frontend (Next.js)  
2. Request hits the Hono-based backend API  
3. Gemini 1.5 Flash checks the prompt for safety and compliance  
4. If safe, Gemini 2.5 Flash takes over and processes the prompt  
5. Tools (via AI SDK) are invoked to fetch or manipulate data  
6. A human-like, context-aware response is generated and returned  

---

## 📦 Getting Started

Clone the repository:
```bash
git clone https://github.com/your-org/ai-customer-support.git
cd ai-customer-support
npm install
# Run backend
cd apps/server
npm run dev

# Run frontend
cd ../web
npm run dev

