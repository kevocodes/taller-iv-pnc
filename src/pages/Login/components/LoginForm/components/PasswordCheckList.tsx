import { cn } from "@/lib/utils";
import { createUserSchema } from "@/schemas/register.schema";
import { Check, X } from "lucide-react";
import { FieldErrors } from "react-hook-form";
import { z } from "zod";

interface PasswordCheckListProps {
  errors: FieldErrors<z.infer<typeof createUserSchema>>;
}

function PasswordCheckList({ errors }: PasswordCheckListProps) {
  if (!errors.password) return null;

  const passwordErrors = JSON.parse(errors.password.message!);

  return (
    <ul>
      {Object.keys(passwordErrors).map((m, i) => {
        const { pass, message } = passwordErrors[m];

        return (
          <li key={i} className="flex justify-start items-center gap-2">
            <span className={cn(pass ? "text-lime-600" : "text-destructive")}>
              {pass ? <Check /> : <X />}
            </span>
            <span className="text-sm">{message}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordCheckList;
