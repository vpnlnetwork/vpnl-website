# Overview

This is the official ethereum.org website - a Next.js 14 application serving as the primary educational and community hub for Ethereum. The site provides comprehensive resources about Ethereum, from beginner guides to advanced technical documentation, supporting 60+ languages through crowdsourced translation efforts.

The application is built with modern web technologies including React 18, TypeScript, Tailwind CSS, and shadcn/ui components, with a focus on accessibility, internationalization, and performance.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
- **Next.js 14.2+ with App Router**: Server-side rendering (SSR), static site generation (SSG), and optimized routing using the modern App Router pattern
- **React 18**: Component-based UI with server and client components
- **TypeScript 5.5+**: Type-safe development with strict mode enabled

## Styling & UI Components
- **Tailwind CSS 3.4+**: Utility-first CSS framework with custom design tokens defined in `tailwind.config.ts`
- **shadcn/ui**: Pre-built accessible components based on Radix UI primitives
- **Radix UI**: Headless component library providing accessible, unstyled primitives
- **Framer Motion**: Animation library for transitions and interactive elements
- **Custom Design System**: Implemented with component variants using `class-variance-authority` (cva)

## Internationalization (i18n)
- **next-intl 3.26+**: Server-side and client-side i18n with 60+ supported languages
- **Language Configuration**: Defined in `i18n.config.json` with locale-specific settings (RTL support, date formats)
- **Translation Management**: Crowdin integration for community-driven translations
- **Default Locale**: English (en) with locale prefix stripping for SEO optimization
- **Routing Strategy**: Locale-based routing with middleware handling in `middleware.ts`

## Content Management
- **MDX Support**: `next-mdx-remote 5.0+` for processing markdown content with React components
- **Content Location**: Static markdown files in `/public/content/` directory
- **Code Examples**: Syntax-highlighted code blocks with language-specific styling
- **Dynamic Content**: Activity stats, community events, and real-time blockchain data

## Analytics & Monitoring
- **Matomo**: Privacy-focused analytics platform for event tracking and user behavior analysis
- **Sentry**: Error tracking and performance monitoring with environment-specific configuration
- **A/B Testing**: Server-side A/B testing integration with Matomo API
- **Event Tracking**: Custom event tracking for user interactions (clicks, form submissions, scrolling)

## Data Visualization
- **Recharts**: Chart library for displaying blockchain statistics and metrics
- **Activity Stats**: Real-time Ethereum network statistics (staked ETH, transactions, nodes)

## Blockchain Integration
- **Viem/Wagmi**: Ethereum blockchain interaction libraries for wallet connections and smart contract interactions
- **Web3 Features**: Wallet detection, ENS resolution, and transaction handling

## Build & Development Tools
- **PNPM**: Fast, disk-efficient package manager
- **ESLint**: Code linting with custom import sorting rules
- **Prettier**: Code formatting with automatic formatting on commit
- **Husky**: Git hooks for pre-commit linting and formatting
- **lint-staged**: Run linters on staged files only

## Testing Infrastructure
- **Storybook 8.6+**: Component development and visual testing environment
- **Chromatic**: Visual regression testing service
- **Playwright**: End-to-end testing framework with cross-browser support
- **Component Stories**: Co-located story files using CSF 3.0 format

## Deployment & Hosting
- **Netlify**: Primary hosting platform with automatic deployments
- **Continuous Deployment**: Automatic builds triggered from GitHub `master` branch
- **Sitemap Generation**: `next-sitemap` for SEO optimization with locale-aware URLs
- **Build Optimization**: CPU and worker thread limits configured for memory-constrained environments

## SEO & Metadata
- **Structured Data**: JSON-LD schema for enhanced search results
- **Open Graph**: Social media preview metadata
- **Canonical URLs**: Proper canonical tags for internationalized content
- **Robots.txt & Sitemap**: Automated generation with locale support

## Performance Optimizations
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages at build time where possible
- **Lazy Loading**: Dynamic imports for heavy components and client-side features
- **Bundle Analysis**: Optional webpack bundle analyzer for size monitoring

## File Organization
- `/app/[locale]/`: Next.js App Router pages with locale-based routing
- `/src/components/`: Reusable React components organized by feature
- `/src/components/ui/`: Base design system components (shadcn/ui)
- `/src/layouts/`: Page layout components
- `/src/lib/`: Utility functions, types, constants, and helpers
- `/src/intl/`: Translation JSON files organized by locale
- `/public/content/`: Markdown content files
- `/public/assets/`: Static images and media files

## Code Conventions
- **Component Structure**: Each component in its own directory with co-located stories and utilities
- **Type Definitions**: Centralized in `src/lib/types.ts` and `src/lib/interfaces.ts`
- **Constants**: Global constants in `src/lib/constants.ts`
- **Import Sorting**: Enforced custom import order via ESLint rules
- **Component Props**: Destructured props with TypeScript types

# External Dependencies

## Third-Party Services
- **Crowdin**: Translation management platform for community localization efforts
- **Algolia**: Site search indexing and search API with DocSearch integration
- **Matomo**: Self-hosted analytics platform (privacy-focused alternative to Google Analytics)
- **Sentry**: Error tracking and performance monitoring service
- **Chromatic**: Visual regression testing for Storybook components
- **Netlify**: Hosting, DNS management, and CI/CD platform

## API Integrations
- **GitHub API**: Repository data fetching for project showcases (requires `GITHUB_TOKEN_READ_ONLY`)
- **Etherscan API**: Blockchain data and transaction information (requires `ETHERSCAN_API_KEY`)
- **Crowdin API**: Programmatic access to translation data (requires `CROWDIN_API_KEY`)
- **Matomo API**: A/B test configuration and analytics data

## External Content Sources
- **Community Events**: Dynamically imported event data
- **Tutorial Lists**: Automatically updated from external sources
- **Developer Documentation**: Referenced from ethereum/execution-specs and other repositories

## Email Services
- **AWS SES**: Email sending service via `@aws-sdk/client-ses` for contact forms

## Environment Variables Required
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry project identifier
- `NEXT_PUBLIC_CONTEXT`: Deployment environment (development/staging/production)
- `GITHUB_TOKEN_READ_ONLY`: GitHub API access token
- `ETHERSCAN_API_KEY`: Etherscan API key
- `CROWDIN_API_KEY`: Crowdin API key
- `ALGOLIA_ADMIN_KEY`: Algolia administrative access
- `SITE_URL`: Base URL for sitemap generation

## Font Dependencies
- **Google Fonts**: Inter (primary font) and IBM Plex Mono (monospace) loaded via `next/font`

## Icon Libraries
- **Custom SVG Icons**: Component-based icons in `/src/components/icons/`
- **Lucide React**: Additional icon set for UI elements