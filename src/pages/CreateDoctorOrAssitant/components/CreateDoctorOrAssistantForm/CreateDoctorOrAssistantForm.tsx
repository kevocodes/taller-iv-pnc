import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordCheckList from "./components/PasswordCheckList";
import { LoaderCircle } from "lucide-react";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { createDoctorOrAssistantSchema } from "@/schemas/createDoctorOrAssistant.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDoctorOrAssistant } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";

function CreateDoctorOrAssistantForm() {
  const navigate = useNavigate();

  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createDoctorOrAssistantSchema>>({
    resolver: zodResolver(createDoctorOrAssistantSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "DCTR",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createDoctorOrAssistantSchema>
  ) => {
    try {
      const message = await createDoctorOrAssistant(values, token!);
      toast.success(message);
      navigate(PRIVATE_ROUTES.MANAGE_DOCTORS_AND_ASSISTANTS);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);

      if (error instanceof Error)
        return toast.error("Error crear el doctor o asistente");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full bg-background rounded-md max-w-3xl flex flex-col gap-8 justify-center items-center p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <PasswordCheckList errors={form.formState.errors} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DCTR">Doctor</SelectItem>
                  <SelectItem value="ASST">Asistente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <LoaderCircle size={16} className="animate-spin mr-2" />
          )}
          Crear cuenta
        </Button>
      </form>
    </Form>
  );
}

export default CreateDoctorOrAssistantForm;
