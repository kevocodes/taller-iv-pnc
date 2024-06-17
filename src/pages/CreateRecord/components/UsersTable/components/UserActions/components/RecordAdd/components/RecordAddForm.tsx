import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ResponseError } from "@/models/ResponseError.model";
import { UserFromAPI } from "@/models/user.model";
import { createRecordSchema } from "@/schemas/record.schema";
import { createRecord } from "@/services/record.service";
import { useAuth } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface RecordAddFormProps {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserFromAPI;
}

function RecordAddForm({ setOpen, className, user, setShowDropdown }: RecordAddFormProps) {
  const token = useAuth((state) => state.token);

  const form = useForm<z.infer<typeof createRecordSchema>>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(data: z.infer<typeof createRecordSchema>) {
    try {
      const message = await createRecord(token!, user.username, data.reason);
      setOpen(false);
      setShowDropdown(false);
      toast.success(message);
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
        className={cn("flex flex-col gap-4", className)}
      >
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
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

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <LoaderCircle size={16} className="animate-spin mr-2" />
          )}
          Agregar entrada
        </Button>
      </form>
    </Form>
  );
}

export default RecordAddForm;
