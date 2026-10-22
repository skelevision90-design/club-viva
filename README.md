# Club Viva — High-Performance Athletic Sanctuary (Jalandhar)

A minimal, high-contrast, editorial one-page web application for **Club Viva**, a gym in Model Town, Jalandhar, Punjab. Tagline: **"Push Yourself"**.

Built mobile-first with a high-performance stack: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Zod.

---

## 🏛️ Brand & Design Foundations

- **Strictly Monochrome Palette**: Pure black (`#000000`), crisp white (`#FFFFFF`), and refined grayscale tones (`#141414`, `#262626`, `#F4F4F5`). Zero accent colors, zero gradients.
- **Editorial Typography**: 
  - Headlines: **Anton** via `next/font/google`, featuring hollow stroke styling (`.text-outline`) for the signature "YOURSELF." mark.
  - Body & UI: **Inter Light** (300/400/500/600) via `next/font/google`.
- **Architectural Contours**: Large rounded corners (32–48px), capsule masks, pill buttons (`rounded-full`), and the diagonal 45° cut on the hero training capsule matching the CV mark.
- **Gritty Training Imagery**: High-contrast, black-and-white training photography stored in `/public/images` for immediate swapping.
- **5 Core Sections**:
  1. **Hero**: Full-screen B&W visual, giant "PUSH YOURSELF.", program sub-line, white pill CTA, schedule & cohort tags, and top navigation.
  2. **What We Train**: 4 stacked program rows (01 Group Classes, 02 Personal Training, 03 MMA Conditioning, 04 Kickboxing Combat) with large numbers and photography.
  3. **Transformations**: Verified outcome image strips (Harman, Simran, Vikram) with metrics and protocol details.
  4. **Join**: High-contrast white card section ("Your first session is on us") with pill-shaped form inputs.
  5. **Footer**: Brand info, address (Model Town Market, Jalandhar), direct phone (+91 98108 34976), Instagram (@club_viva_jalandhar), floor hours, and floating WhatsApp pill.

---

## 🛡️ Security Architecture & Hardening

1. **Server-Side Validation & Sanitization (Zod)**
   - Strict schema in `src/lib/validation.ts`.
   - Name: 2–60 characters, alpha and punctuation only.
   - Phone: Indian format (10 digits starting with 6–9, optional `+91` or `0`). Normalized cleanly.
   - Goal: Strict enum check (`group-classes`, `personal-training`, `mma`, `kickboxing`).
   - Rejects non-POST HTTP methods on `/api/lead` with `405 Method Not Allowed`.

2. **Bot & Abuse Mitigation**
   - **Honeypot Trap**: Hidden input (`organization_trap`) catches automated scrapers; if filled, the payload is quietly neutralised.
   - **Submission Time Threshold**: Enforces a minimum human completion time (`MIN_FORM_TIME_MS`, default 2,000ms) to block instant headless form fillers.
   - **Cloudflare Turnstile**: Integrated client-side widget with server-side token validation via Cloudflare's `siteverify` API.
   - **IP Rate Limiting**: In-memory rate limiting (5 requests per 10 minutes per IP) with automatic memory cleanup.
   - **Payload Size Capping**: Rejects request bodies larger than 16KB (`413 Payload Too Large`).

3. **Strict Security Headers (in `next.config.mjs`)**
   - **Content-Security-Policy (CSP)**: `default-src 'self'`, no `unsafe-eval`, allowlist for Turnstile (`challenges.cloudflare.com`) and Unsplash images.
   - **Strict-Transport-Security (HSTS)**: `max-age=63072000; includeSubDomains; preload` (2 years).
   - **X-Content-Type-Options**: `nosniff`.
   - **X-Frame-Options**: `DENY` & CSP `frame-ancestors 'none'`.
   - **Referrer-Policy**: `strict-origin-when-cross-origin`.
   - **Permissions-Policy**: Explicitly disables camera, microphone, and geolocation.
   - **Header Stripping**: `poweredByHeader: false` removes the `X-Powered-By: Next.js` fingerprint.

4. **Frontend Safety & Privacy**
   - Zero `dangerouslySetInnerHTML` or `eval()`.
   - All external outbound links include `rel="noopener noreferrer"`.
   - Fixed WhatsApp URL (`https://wa.me/919810834976?text=...`) prevents URL injection.
   - Semantic accessible HTML with `alt` attributes, keyboard focus rings, and `prefers-reduced-motion` compliance.
   - Zero third-party trackers, zero advertising cookies. Clear privacy notice on lead capture.

5. **Dependency Hygiene**
   - Pinned dependencies.
   - Zero `npm audit` vulnerabilities.

---

## 🚀 Getting Started

### 1. Environment Configuration

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default development values in `.env.local` use Cloudflare's official testing keys which automatically pass verification:
```ini
NODE_ENV=development
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
CLOUDFLARE_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=600000
MIN_FORM_TIME_MS=2000
```

### 2. Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 3. Production Build

```bash
npm run build
npm start
```

---

## 📸 Swapping Training Photos

To replace demo placeholders with official gym photography, drop your images into `/public/images/` using these exact file names:

- `hero-deadlift.jpg` — Hero section main athlete visual
- `program-group.jpg` — Program 01: Group Classes
- `program-personal.jpg` — Program 02: Personal Training
- `program-mma.jpg` — Program 03: MMA Conditioning
- `program-kickboxing.jpg` — Program 04: Kickboxing Combat
- `transform-harman.jpg` — Transformation 1: Harman
- `transform-simran.jpg` — Transformation 2: Simran
- `transform-vikram.jpg` — Transformation 3: Vikram

---

## 🚢 Vercel Deployment Checklist

- [ ] Create a new project in the [Vercel Dashboard](https://vercel.com).
- [ ] Connect the GitHub/GitLab repository.
- [ ] In **Project Settings > Environment Variables**, add:
  - `NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY`
  - `CLOUDFLARE_TURNSTILE_SECRET_KEY`
  - `RATE_LIMIT_MAX_REQUESTS` (recommended: `5`)
  - `RATE_LIMIT_WINDOW_MS` (recommended: `600000`)
- [ ] Ensure **Strict HTTPS** is enabled on Vercel domain settings.
- [ ] Deploy and verify the custom 404 page by visiting `/nonexistent-route`.
