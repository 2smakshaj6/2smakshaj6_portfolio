# Security Portfolio

A fast, single-page portfolio website showcasing expertise in both Security Engineering and Software Engineering.

## Features

- **Security-First Design**: Dark theme with security-themed animations and error pages
- **Three.js Hero Animation**: Subtle shield animation with threat pulses (respects reduced motion)
- **Interactive Demos**: 
  - Security alert simulation
  - Engineering metrics dashboard
- **Secure Backend**: Flask API with CSRF protection, rate limiting, and security headers
- **Accessibility**: WCAG compliant with semantic HTML and ARIA labels
- **Mobile-First**: Responsive design optimized for all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, Three.js
- **Backend**: Flask (Python)
- **Hosting**: Vercel
- **Security**: CSP, CSRF protection, rate limiting, security headers

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/simulate-alert` - Security alert simulation
- `GET /api/metrics` - Engineering metrics
- `GET /api/csrf-token` - CSRF token generation

## Deployment

1. Deploy to Vercel
2. All API routes are automatically configured
3. Security headers are applied globally
4. Static assets are cached for optimal performance

## Security Features

- Content Security Policy (CSP)
- CSRF protection with double-submit cookies
- Rate limiting (5 requests per 10 minutes per IP)
- Security headers on all responses
- Honeypot fields for bot protection
- Input validation and sanitization

## Performance

- Lighthouse score target: 90+ across all metrics
- Optimized Three.js animation with reduced motion support
- Efficient CSS with mobile-first approach
- Minimal JavaScript footprint
