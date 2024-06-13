import { z } from "zod";

export const createAppointmentSchema = z.object({
  reason: z.string().min(1, { message: "La razón es requerida" }),
  appointmentRequestDateTime: z
    .date({ message: "La fecha y hora son requeridas" })
    .refine(
      (date) => {
        return date > new Date();
      },
      { message: "La fecha y hora deben ser en el futuro" }
    ),
});

export const approveAppointmentSchema = z.object({
  duration: z.string().min(1, {message: "Duración en minutos requerida"}).refine((value) => Number(value) > 0, {
    message: "La duración en minutos debe ser mayor a 0",
  }),
  realizationDateTime: z
    .date({ message: "La hora es requerida" })
    .refine(
      (date) => {
        return date > new Date();
      },
      { message: "La fecha y hora deben ser en el futuro" }
    ),
})