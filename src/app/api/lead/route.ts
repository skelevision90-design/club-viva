import { NextRequest, NextResponse } from "next/server";
import { leadSubmissionSchema } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { env } from "@/lib/env";

// Maximum allowable payload size (16KB)
const MAX_PAYLOAD_BYTES = 16 * 1024;

// Reject all non-POST methods explicitly with 405 Method Not Allowed
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Only POST submissions are accepted." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed. Only POST submissions are accepted." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed. Only POST submissions are accepted." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. Enforce payload size limit
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload exceeds permissible size threshold." },
        { status: 413 }
      );
    }

    // 2. Extract client IP securely
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (req.headers.get("x-real-ip") || "127.0.0.1");

    // 3. IP-based rate limiting (5 requests per 10 minutes)
    const rateLimit = checkRateLimit(clientIp, env.RATE_LIMIT_MAX_REQUESTS, env.RATE_LIMIT_WINDOW_MS);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many submissions from this connection. Please retry after ${rateLimit.resetInSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.resetInSeconds.toString(),
          },
        }
      );
    }

    // 4. Parse incoming JSON body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed request payload. JSON expected." },
        { status: 400 }
      );
    }

    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 400 }
      );
    }

    const payload = rawBody as Record<string, unknown>;

    // 5. Bot Defense: Honeypot trap check
    // If hidden trap field is populated, silently drop without executing downstream actions
    if (typeof payload.organization_trap === "string" && payload.organization_trap.trim().length > 0) {
      console.warn(`[SECURITY ALERT] Honeypot triggered from IP: ${clientIp}`);
      // Return 200 to not reveal detection to automated crawlers
      return NextResponse.json({
        success: true,
        message: "Your submission has been received.",
      });
    }

    // 6. Bot Defense: Minimum human submission time delta check
    const startTime = typeof payload.formStartTime === "number" ? payload.formStartTime : 0;
    const now = Date.now();
    const elapsedMs = now - startTime;

    if (startTime <= 0 || elapsedMs < env.MIN_FORM_TIME_MS) {
      return NextResponse.json(
        { error: "Submission completed too quickly. Please review your details before submitting." },
        { status: 400 }
      );
    }

    // 7. Verify Turnstile / Captcha Challenge Token
    const turnstileToken = typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";
    const verification = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!verification.success) {
      return NextResponse.json(
        { error: "Security challenge verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    // 8. Server-side Zod validation & input sanitization
    const validationResult = leadSubmissionSchema.safeParse(payload);
    if (!validationResult.success) {
      // Extract user-friendly error messages without leaking internals
      const errors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        errors.name?.[0] ||
        errors.phone?.[0] ||
        errors.goal?.[0] ||
        "Please provide valid submission details.";

      return NextResponse.json(
        { error: firstErrorMessage, fieldErrors: errors },
        { status: 422 }
      );
    }

    const lead = validationResult.data;

    // 9. Server console logging for demo (with clear production TODOs)
    const divider = "========================================================";
    console.log(`\n${divider}`);
    console.log("🔥 [CLUB VIVA] NEW TRIAL SESSION LEAD RECEIVED 🔥");
    console.log(`Timestamp : ${new Date().toISOString()}`);
    console.log(`Client IP : ${clientIp}`);
    console.log(`Name      : ${lead.name}`);
    console.log(`Phone     : ${lead.phone}`);
    console.log(`Discipline: ${lead.goal.toUpperCase()}`);
    console.log(divider);
    console.log(
      "// TODO (Production): Forward lead to Resend email (support@clubviva.in) or Google Sheets Webhook."
    );
    console.log(
      "// Example: await resend.emails.send({ from: 'onboarding@clubviva.in', to: 'owner@clubviva.in', ... })"
    );
    console.log(`${divider}\n`);

    // 10. Return sanitized success response
    return NextResponse.json(
      {
        success: true,
        message: `Session reserved for ${lead.name}. Our head coach will confirm your induction slot on WhatsApp at ${lead.phone}.`,
        discipline: lead.goal,
      },
      { status: 200 }
    );
  } catch (error) {
    // Never expose stack trace or database/server internals in production
    console.error("Unhandled error in /api/lead:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
