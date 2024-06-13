import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { useAuth } from "@/stores/auth.store";
import { createAppointmentSchema } from "@/schemas/appointment.schema";
import { Textarea } from "@/components/ui/textarea";
import AppointmentCreateFormDatePicker from "./components/AppointmentCreateFormDatePicker";
import { requestAppointment } from "@/services/appointment.service";

function RequestAppointmentForm() {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createAppointmentSchema>>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createAppointmentSchema>) => {
    try {
      const message = await requestAppointment(values, token!);
      toast.success(message);
      form.reset();
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);

      if (error instanceof Error) return toast.error("Error al solicitar la cita");
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-3xl bg-background rounded-lg flex flex-col gap-8 justify-center items-center p-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Razón de la cita</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escriba la razón aquí..."
                  className="resize-none h-36"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appointmentRequestDateTime"
          render={({ field }) => (
            <AppointmentCreateFormDatePicker field={field} />
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
          Solicitar
        </Button>
      </form>
    </Form>
  );
}

export default RequestAppointmentForm;
