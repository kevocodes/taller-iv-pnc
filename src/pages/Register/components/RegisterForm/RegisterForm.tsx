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
import { createUserSchema } from "@/schemas/register.schema";
import { LoaderCircle } from "lucide-react";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { signUp } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/constants/routes";

function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    try {
      const message = await signUp(values);
      toast.success(message);
      navigate(PUBLIC_ROUTES.LOGIN);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);

      if (error instanceof Error) return toast.error("Error al iniciar sesión");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full bg-background rounded-lg flex flex-col gap-8 justify-center items-center"
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

export default RegisterForm;
