
import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  category: z.string().optional(),
  is_visible: z.boolean().default(true),
});

export const CATEGORIES = [
  "Strategy", "Pitch", "Marketing", "Business", "Proposal", "Case Study", "Workshop"
];

export type FormValues = z.infer<typeof formSchema>;
