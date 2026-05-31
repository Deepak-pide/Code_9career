# Code-9 Hiring Portal

> **Assemble. Build. Get Hired Together.**

The premier platform connecting ambitious student teams with high-growth startups. Code-9 is a full-stack web application that enables students to join core teams, apply for opportunities, and accelerate their collective careers.

![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange?logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)

## ✨ Features

### Core Features

- **Firebase Unified Identity** — Secure student and admin authentication using Firebase Auth with dedicated profiles for portfolios and GitHub links
- **Vibrant Opportunity Hub** — A dynamic marketplace featuring colorful, categorized cards for roles ranging from Frontend Dev to AI Intern, stored in Firestore
- **AI Application Ranker** — Uses Google GenAI to summarize applicant resumes and suggest candidates based on specific role requirements
- **Live Application Tracker** — Real-time dashboard for students to monitor application status with immediate updates via Firestore listeners
- **Admin Management Console** — A comprehensive dashboard for admins to post opportunities, accept/reject members, and view recruitment analytics
- **Talent Showcase Gallery** — Public-facing grid displaying hired students and 'Core Team' members with professional status badges
- **Portfolio Asset Management** — Secure file handling for resume and media uploads leveraging cloud storage

### Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Auth, Firestore)
- **AI Integration:** [Genkit](https://firebase.google.com/products/genkit) + Google Generative AI
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- A Firebase project with Authentication and Firestore enabled
- A Google Generative AI API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/prinshu756/Code_9career.git
cd Code_9career
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google Generative AI (for AI features)
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:9002](http://localhost:9002) in your browser

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack on port 9002 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run genkit:dev` | Start Genkit AI development server |
| `npm run genkit:watch` | Start Genkit AI development server with watch mode |

## 📁 Project Structure

```
Code_9career/
├── src/
│   ├── ai/                    # AI flows and Genkit configuration
│   │   └── flows/
│   │       └── admin-applicant-summarizer.ts  # AI-powered resume summarizer
│   ├── app/                   # Next.js App Router pages
│   │   ├── auth/login/        # Authentication page
│   │   ├── dashboard/         # User dashboards
│   │   │   └── admin/         # Admin console
│   │   ├── opportunities/     # Job opportunities listing
│   │   ├── teams/             # Team browsing and details
│   │   ├── showcase/          # Talent showcase gallery
│   │   ├── services/          # Services page
│   │   └── about/             # About page
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── ui/                # shadcn/ui components
│   │   ├── opportunities/     # Opportunity-specific components
│   │   └── teams/             # Team-specific components
│   ├── firebase/              # Firebase configuration and utilities
│   │   ├── auth/              # Authentication hooks
│   │   └── firestore/         # Firestore hooks
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities and data files
├── docs/                      # Documentation
└── public/                    # Static assets
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | `#3B82F6` | Primary color for buttons and branding |
| Studio White | `#F9FAFB` | Background |
| Rose | `#F43F5E` | Accent for designer roles |
| Indigo | `#6366F1` | Accent for developer roles |
| Amber | `#F59E0B` | Accent for writer roles |

### Typography

- **Headlines:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Computerized, technical personality
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) — Objective, neutral look

### Design Principles

- Bento-style grid systems with 24px rounded corners
- Generous white space and subtle glassmorphic blurs
- Staggered entrance animations for cards
- Smooth micro-interactions with spring physics

## 🔥 Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** with your preferred providers (Email/Password, Google, GitHub)
3. Enable **Firestore Database**
4. Enable **Storage** for file uploads
5. Copy your Firebase configuration to `.env.local`

### Firestore Collections

The application uses the following Firestore collections:
- `users` — User profiles and portfolios
- `teams` — Core team information
- `opportunities` — Job/internship listings
- `applications` — Student applications
- `admin` — Admin-specific data

## 🤖 AI Features

The application integrates Google Generative AI through Genkit to provide:

- **Resume Summarization** — Automatically extracts key information from applicant resumes
- **Candidate Ranking** — Suggests best-fit candidates based on role requirements
- **Smart Matching** — AI-powered compatibility scoring between applicants and teams

To run the AI development server:

```bash
npm run genkit:dev
```

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero section |
| `/teams` | Browse available core teams |
| `/teams/[id]` | Individual team details |
| `/opportunities` | Job/internship listings |
| `/auth/login` | User authentication |
| `/dashboard/admin` | Admin dashboard |
| `/dashboard/admin/applications` | Application management |
| `/dashboard/admin/console` | Admin console |
| `/showcase` | Talent showcase gallery |
| `/services` | Platform services |
| `/about` | About page |

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Firebase App Hosting

The project includes `apphosting.yaml` for Firebase App Hosting deployment:

```bash
firebase apphosting:deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **GitHub:** [github.com/prinshu756/Code_9career](https://github.com/prinshu756/Code_9career)
- **Demo:** [Live Demo](#) (coming soon)

---

Built with ❤️ by the Code-9 Team