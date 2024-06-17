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
import { LoaderCircle } from "lucide-react";
import { signIn, validateSession } from "@/services/auth.service";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { loginSchema } from "@/schemas/login.schema";
import { createAppUserFromResponseUser } from "@/utils/createAppUserFromResponseUser";
import { useAuth } from "@/stores/auth.store";
function LoginForm() {
  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const data = await signIn(values);
      const responseUser = await validateSession(data.token);
      const user = createAppUserFromResponseUser(responseUser);
      setUser(user);
      setToken(data.token);

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
          name="identifier"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Identificador</FormLabel>
              <FormControl>
                <Input placeholder="johndoe ó johndoe@gmail.com" {...field} />
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
                <Input
                  placeholder="*********"
                  {...field}
                  type="password"
                />
              </FormControl>
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
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
