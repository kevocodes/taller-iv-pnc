import { z } from "zod";

export const createRecordSchema = z.object({
  reason: z.string().min(1, "Debe ingresar una razón del registro del paciente"),
});