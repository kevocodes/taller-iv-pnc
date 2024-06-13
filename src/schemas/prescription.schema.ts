import { z } from "zod"

export const createPrescription = z.object({
  medicine: z.string().min(1, { message: "Nombre de la medicina requerida" }),
  dose: z.string().min(1, { message: "Dósis es requerida" }),
  prescriptionEndLocalDateTime: z
    .date({ message: "La fecha del tratamiento es requerida" })
    .refine(
      (date) => {
        return date > new Date();
      },
      { message: "La fecha debe ser en el futuro" }
    ),
})  