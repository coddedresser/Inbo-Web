# Next.js Web Application

A comprehensive Next.js 16 web application with authentication, internationalization, SEO optimization, and mobile app deep linking support.

## Features

- ✅ **Authentication System**
  - Password-based authentication
  - Google OAuth authentication
  - OTP (One-Time Password) authentication
  - Magic Link authentication
  - Protected routes with middleware
  - JWT token management

- ✅ **Internationalization (i18n)**
  - Multi-language support (en, es, fr, de, hi, zh)
  - Locale detection
  - Translation management

- ✅ **SEO Optimization**
  - Dynamic meta tags
  - Open Graph support
  - Twitter Card support
  - Structured data ready

- ✅ **Mobile App Integration**
  - Deep linking support
  - Universal links
  - Custom URL schemes
  - Cross-platform authentication

- ✅ **Django Backend Integration**
  - RESTful API communication
  - Automatic token refresh
  - Error handling
  - Request/response interceptors

## Getting Started

### Prerequisites

- Node.js 18+ or later
- pnpm (recommended) or npm
- Django backend running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_DEEP_LINK_SCHEME=inbo://
NEXT_PUBLIC_APP_DOMAIN=inbo.app
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   │   ├── GoogleAuth.tsx
│   │   ├── OTPAuth.tsx
│   │   ├── MagicLinkAuth.tsx
│   │   └── ProtectedRoute.tsx
│   └── seo/            # SEO components
│       └── SEOHead.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── middleware.ts       # Next.js middleware (auth protection)
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── auth/
│   │   ├── login.tsx
│   │   └── verify-magic-link.tsx
│   └── dashboard.tsx
├── services/           # API services
│   └── auth.ts
├── types/              # TypeScript types
│   ├── auth.ts
│   └── index.ts
└── utils/              # Utility functions
    ├── api.ts          # Axios instance
    ├── deepLink.ts     # Deep linking handler
    ├── env.ts          # Environment variables
    └── seo.tsx         # SEO utilities
```

## Authentication

The application supports multiple authentication methods:

### Password Authentication
Traditional email/password login via Django backend.

### Google OAuth
Google Sign-In integration for quick authentication.

### OTP Authentication
One-Time Password authentication via email or phone.

### Magic Link
Passwordless authentication via email magic links.

### Deep Linking
Support for mobile app authentication via deep links.

## Protected Routes

Use the `withAuth` HOC to protect pages:

```typescript
import { withAuth } from '@/components/auth';

function MyProtectedPage() {
  return <div>Protected Content</div>;
}

export default withAuth(MyProtectedPage);
```

Or use the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from '@/components/auth';

function MyPage() {
  return (
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );
}
```

## Internationalization

The application uses `next-i18next` for internationalization.

### Adding Translations

1. Add translation files in `public/locales/{locale}/{namespace}.json`
2. Use translations in components:

```typescript
import { useTranslation } from 'next-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
}
```

## SEO

Use the `SEOHead` component or `useSEO` hook for dynamic SEO:

```typescript
import { SEOHead } from '@/components/seo/SEOHead';

function MyPage() {
  return (
    <>
      <SEOHead 
        title="My Page" 
        description="Page description"
      />
      <div>Content</div>
    </>
  );
}
```

## Deep Linking

The application supports deep linking for mobile app integration:

```typescript
import DeepLinkHandler from '@/utils/deepLink';

// Generate deep link
const deepLink = DeepLinkHandler.generateDeepLink({
  token: 'auth-token',
  redirect: '/dashboard'
});
```

## API Integration

The application communicates with the Django backend via:

- Base URL: `http://localhost:8000/api/v1`
- Authentication: Bearer token (JWT)
- Automatic token refresh on 401 errors

### Authentication Endpoints

- `POST /auth/login` - Password login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current user
- `POST /auth/google` - Google OAuth
- `POST /auth/otp/request` - Request OTP
- `POST /auth/otp/verify` - Verify OTP
- `POST /auth/magic-link/request` - Request magic link
- `POST /auth/magic-link/verify` - Verify magic link
- `POST /auth/deep-link` - Deep link authentication

## Building for Production

```bash
pnpm build
pnpm start
```

## Docker

```bash
docker-compose up
```

## License

MIT
