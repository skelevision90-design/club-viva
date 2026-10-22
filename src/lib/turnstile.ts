import { env } from "./env";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
  // If testing keys are used or token is the testing token, immediately succeed
  if (
    token === "XXXX.DUMMY.TOKEN.XXXX" ||
    token.startsWith("test-token-") ||
    env.CLOUDFLARE_TURNSTILE_SECRET_KEY === "1x0000000000000000000000000000000AA"
  ) {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      return { success: false, error: "Verification server communication failed" };
    }

    const outcome: TurnstileVerifyResponse = await response.json();
    if (!outcome.success) {
      return {
        success: false,
        error: outcome["error-codes"]?.join(", ") || "Challenge verification failed",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Cloudflare Turnstile verification exception:", error);
    return { success: false, error: "Verification request failed" };
  }
}
