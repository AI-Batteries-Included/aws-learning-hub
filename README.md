# AWS Learning Hub

A comprehensive learning platform for Amazon Web Services (AWS) built with Next.js 14 and TypeScript.

## Overview

The AWS Learning Hub provides structured learning paths, practical examples, and best practices for AWS services. This platform is designed to help developers and cloud engineers learn AWS services effectively through hands-on tutorials and real-world examples.

## Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AI-Batteries-Included/aws-learning-hub.git
   cd aws-learning-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode with hot reload
- `npm run build` - Builds the app for production
- `npm run start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint to check for code issues

## Project Structure

```
aws-learning-hub/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── README.md             # This file
└── tsconfig.json         # TypeScript configuration
```

## Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Linting:** ESLint
- **Styling:** CSS (no framework for basic setup)

## Development Guidelines

- This project uses the Next.js App Router (not Pages Router)
- TypeScript is required for all code
- Follow ESLint rules for code quality
- Ensure all builds pass before committing changes

## Roadmap

- [ ] Epic 1A: Basic Next.js Setup ✅
- [ ] Epic 1B: MDX Integration (Next)
- [ ] Content Management System
- [ ] Learning Path Navigation
- [ ] Interactive Examples

## Contributing

This project is part of the AI Batteries Included learning platform. Please follow the established development workflows and ensure all tests pass before submitting pull requests.

## License

This project is licensed under the MIT License.
