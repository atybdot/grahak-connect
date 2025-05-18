# Grahak-connect | 🤖 AI Customer Support Platform
An AI-powered multilingual customer support system delivering human-like conversational experiences with seamless tool integration, real-time safeguarding, and a user-friendly interface for businesses of all sizes.


## 📚 Key Features

- 🤖 Human-like AI chat experience powered by Gemini Flash  
- 🛡️ Real-time prompt safeguarding with Gemini 1.5  
- 🌍 Multilingual support including English and various Indian regional languages  
- 📱 User-friendly mobile and web interfaces   
- 🔌 Tool calling capabilities for backend operations  
- 🔐 JWT-based authentication for security


## 🧠 Built With

- **Gemini 2.5 Flash** – LLM and tool calling  
- **Gemini 1.5 Flash** – Safety and content safeguarding  
- **Next.js** – Frontend  
- **Hono** – Backend API framework  
- **AI SDK** – Tool calling interface  
- **JWT** – Basic authentication  

## ⚙️ Tech Stack 

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


## 📦 Getting Started
First Clone the repository:
```bash
git clone https://github.com/atybdot/grahak-connect.git
cd ai-customer-support
```

then, install the dependencies:

```bash
pnpm install
```
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


## Database Setup

This project uses PostgreSQL with Prisma ORM.

1. Make sure you have a PostgreSQL database set up.
2. see the `env.ts` file in `apps/api` to get sample env variables
3. Update your `apps/api/.env` file with your PostgreSQL connection details.

4. Generate the Prisma client:
```bash
pnpm db:generate
```
5. Optionally seed the db:
```bash
pnpm dlx prisma db seed
```
if you get errors, then either skip this step or use bun or deno to run `seed.ts`:
```sh
bunx run apps/api/prisma/seed.ts
```
6. Apply migrations:

```sh
pnpm run db:migrate
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.  
The API is running at [http://localhost:3000](http://localhost:3000).  
Server is runnig at [http://localhost:3000](http://localhost:3002).  

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
- `pnpm check`: Run Biome formatting and linting
