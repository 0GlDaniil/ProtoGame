import { z } from 'zod';
import { Cities, Danger } from '@/globals/types/enums';

const dangerKeys = Object.keys(Danger) as ['none', 'low', 'medium', 'high', 'critical'];
const cityValues = Object.values(Cities);

export const spiritSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  danger: z.enum(dangerKeys), // "low" | "medium" | "high" | "critical"
  location: z.enum(cityValues),  // "Shibuya" | "Shinjuku" | ...
  status: z.enum(['active', 'captured'])
});

// 3. Схема для capture запроса
export const captureRequestSchema = z.object({
  id: z.string()
});

// 4. Типы из схем (автоматически!)
export type Spirit = z.infer<typeof spiritSchema>;
export type CaptureRequest = z.infer<typeof captureRequestSchema>;