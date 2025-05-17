// lib/schema.ts
import { z } from "zod";

export const ProfileSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  city: z.string(),
  region: z.string(),
  cellPhone: z.number(),
  zipCode: z.number(),
  goals: z.string(),
});

export type ProfileType = z.infer<typeof ProfileSchema>;
