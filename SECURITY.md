# Security Policy

## Club Viva Digital Sanctuary

At Club Viva, we treat digital security with the same uncompromising discipline as physical training. Our architecture enforces a minimal attack surface: no client-accessible database, zero user tracking, strict Content Security Policy (CSP), encrypted transport, and comprehensive server-side input validation.

### Reporting a Vulnerability

If you discover a potential vulnerability within the Club Viva web platform, please disclose it responsibly:

1. **Email**: Send vulnerability reports directly to `security@clubviva.in` (or management at `info@clubviva.in`).
2. **Details**: Include:
   - Specific URL or endpoint affected.
   - Proof-of-concept steps or payload.
   - Perceived severity and potential impact.
3. **Response Timeline**:
   - Acknowledgment within 24 hours.
   - Initial assessment and triage within 72 hours.
   - Patch deployment and resolution notification upon completion.

### Security Defenses Implemented

- **Monochrome Zero-Tracker Guarantee**: No tracking pixels, third-party analytics cookies, or behavioral beacons.
- **Strict Content Security Policy (CSP)**: `default-src 'self'`, `unsafe-eval` completely blocked, frame-ancestors denied.
- **Bot Mitigation**: Cloudflare Turnstile token validation, hidden honeypot capture, and minimum form completion delta enforcement.
- **Rate Limiting**: In-memory IP-based rate limiting on all route handlers (5 submissions per 10 minutes).
- **Server Validation**: Strict schema enforcement with Zod and sanitized input fields.
- **Transport Security**: HSTS preload, no-sniff content headers, disabled sensitive browser permissions (camera, microphone, geolocation).
