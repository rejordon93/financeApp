// lib/schema.ts
import { z } from "zod";

export const ProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  city: z.string(),
  region: z.string(),
  income: z.number(),
  taxRate: z.number(),
  bio: z.string(),
  debt: z.number(),
  goals: z.string(),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
