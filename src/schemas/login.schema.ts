import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "El identificador es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});