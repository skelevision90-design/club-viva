import { z } from "zod";

export const GOAL_OPTIONS = [
  { value: "group-classes", label: "Group Classes & Conditioning" },
  { value: "personal-training", label: "Personal Training (1-on-1)" },
  { value: "mma", label: "MMA Conditioning" },
  { value: "kickboxing", label: "Kickboxing Combat" },
] as const;

export type GoalType = (typeof GOAL_OPTIONS)[number]["value"];

// Server validation schema
export const leadSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must not exceed 60 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name should only contain letters, spaces, dots, or hyphens"),

  phone: z
    .string()
    .trim()
    .transform((val) => val.replace(/[\s\-()]/g, "")) // strip whitespace and dashes
    .refine((val) => {
      // Validates Indian phone: 10 digits starting with 6-9, optionally prefixed by +91 or 0
      return /^(?:\+?91|0)?[6-9]\d{9}$/.test(val);
    }, {
      message: "Please enter a valid 10-digit Indian mobile number (+91 optional)",
    })
    .transform((val) => {
      // Normalize to +91 10-digit format
      const digits = val.replace(/\D/g, "");
      const tenDigits = digits.length > 10 ? digits.slice(-10) : digits;
      return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
    }),

  goal: z.enum(["group-classes", "personal-training", "mma", "kickboxing"], {
    errorMap: () => ({ message: "Please select a valid training discipline" }),
  }),

  // Honeypot field (hidden from legitimate users, filled by bots)
  organization_trap: z
    .string()
    .max(0, "Bot detected")
    .optional()
    .or(z.literal("")),

  // Minimum time to submit anti-bot timestamp
  formStartTime: z.number().int().positive({
    message: "Invalid submission metadata",
  }),

  // Cloudflare Turnstile token
  turnstileToken: z.string().min(1, "Verification challenge token required"),
});

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
