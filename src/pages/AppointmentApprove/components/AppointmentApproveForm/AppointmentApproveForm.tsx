import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResponseError } from "@/models/ResponseError.model";
import { approveAppointmentSchema } from "@/schemas/appointment.schema";
import { useAppointment } from "@/stores/appointment.store";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AppointmentRealizationTime from "./components/AppointmentRealizationTime/AppointmentRealizationTime";
import { useAuth } from "@/stores/auth.store";
import { getAvailableDoctors } from "@/services/users.service";
import React from "react";

interface AppointmentApproveFormProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function AppointmentApproveForm({ setStep }: AppointmentApproveFormProps) {
  const token = useAuth((state) => state.token);
  const setDoctors = useAppointment((state) => state.setDoctors);
  const appointment = useAppointment((state) => state.appointment);
  const approveInformation = useAppointment(
    (state) => state.approveInformation
  );
  const setApproveInformation = useAppointment(
    (state) => state.setApproveInformation
  );

  const form = useForm<z.infer<typeof approveAppointmentSchema>>({
    resolver: zodResolver(approveAppointmentSchema),
    defaultValues: {
      duration: approveInformation.duration || String(15), // Default duration
      realizationDateTime:
        approveInformation.realizationDateTime ||
        dayjs(appointment?.appointmentRequestDateTime).toDate(), // Default realization date
    },
  });

  const handleContinue = async (
    data: z.infer<typeof approveAppointmentSchema>
  ) => {
    try {
      const availableDoctors = await getAvailableDoctors(
        data.realizationDateTime!.toISOString(),
        dayjs(data.realizationDateTime)
          .add(Number(data.duration), "minute")
          .toISOString(),
        token!
      );

      if (availableDoctors.length === 0) {
        return toast.error(
          "No hay doctores disponibles en el horario seleccionado"
        );
      }

      setDoctors(availableDoctors);

      // Continue to the next step
      setApproveInformation(data);
      setStep(2);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full bg-background p-4 rounded-md max-w-3xl flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleContinue)}
      >
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">Detalle de la consulta</p>

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} type="number" />
                </FormControl>
                <FormDescription>
                  Duración en minutos de la consulta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realizationDateTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de realización</FormLabel>
                <FormControl>
                  <AppointmentRealizationTime field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button variant={"default"} type="submit">
          Continuar
        </Button>
      </form>
    </Form>
  );
}

export default AppointmentApproveForm;
