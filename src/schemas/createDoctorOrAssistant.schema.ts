import { z } from "zod";

// Expresión regular que permite caracteres alfanuméricos sin espacios
const noWhiteSpace = /^[^\s]+$/;

export const createDoctorOrAssistantSchema = z
  .object({
    username: z
      .string()
      .min(1, "Nombre de usuario requerido")
      .regex(noWhiteSpace, {
        message: "Nombre de usuario no debe contener espacios en blanco",
      }),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string(),
    role: z.string().min(1, "Rol requerido"),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    let errObj = {
      upperCase: { pass: true, message: "1 mayúscula" },
      lowerCase: { pass: true, message: "1 minúscula" },
      specialCh: { pass: true, message: "1 caracter especial" },
      totalNumber: { pass: true, message: "1 número" },
    };

    if (countOfLowerCase < 1) {
      errObj = { ...errObj, lowerCase: { ...errObj.lowerCase, pass: false } };
    }
    if (countOfNumbers < 1) {
      errObj = {
        ...errObj,
        totalNumber: { ...errObj.totalNumber, pass: false },
      };
    }
    if (countOfUpperCase < 1) {
      errObj = { ...errObj, upperCase: { ...errObj.upperCase, pass: false } };
    }
    if (countOfSpecialChar < 1) {
      errObj = { ...errObj, specialCh: { ...errObj.specialCh, pass: false } };
    }

    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["password"],
        message: JSON.stringify(errObj),
      });
    }
  });
