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
import { cn } from "@/lib/utils";
import { ResponseError } from "@/models/ResponseError.model";
import { UserFromAPI } from "@/models/user.model";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PrescriptionEndDate from "./components/PrescriptionEndDate/PrescriptionEndDate";
import { createPrescription } from "@/schemas/prescription.schema";

interface CreatePrescriptionFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePrescriptionForm({ user }: CreatePrescriptionFormProps) {
  const token = useAuth((state) => state.token);
  const appointment = useAppointment((state) => state.appointment);

  const form = useForm<z.infer<typeof createPrescription>>({
    resolver: zodResolver(createPrescription),
    defaultValues: {
      dose: "",
      medicine: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createPrescription>) {
    try {
      // const message = await createRecord(token!, user.username, data.reason);
      // toast.success(message);
    } catch (error) {
      if (error instanceof ResponseError) {
        return toast.error(error.message);
      }

      if (error instanceof Error) {
        return toast.error(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-4 w-full max-w-2xl bg-background p-4")}
      >
        <FormField
          control={form.control}
          name="medicine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medicina</FormLabel>
              <FormControl>
                <Input placeholder="Acetaminofén" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dósis</FormLabel>
              <FormControl>
                <Input placeholder="20 mg 1 vez al día" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prescriptionEndLocalDateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de finalización del tratamiento</FormLabel>
              <FormControl>
                <PrescriptionEndDate field={field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <LoaderCircle size={16} className="animate-spin mr-2" />
          )}
          Añadir medicina
        </Button>
      </form>
    </Form>
  );
}

export default CreatePrescriptionForm;
