import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { createPrescription } from "@/schemas/prescription.schema";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface PermitEndDateDateProps {
  field: ControllerRenderProps<
    z.infer<typeof createPrescription>,
    "prescriptionEndLocalDateTime"
  >;
  className?: string;
}

function PrescriptionEndDate({ field, className }: PermitEndDateDateProps) {
  return (
    <FormItem className={cn("flex flex-col", className)}>
      <Dialog>
        <FormControl>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-center text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                dayjs(field.value).format("DD/MM/YYYY")
              ) : (
                <span>Finalización del tratamiento</span>
              )}
            </Button>
          </DialogTrigger>
        </FormControl>
        <FormMessage />

        <DialogContent className="w-auto">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
          />
        </DialogContent>
      </Dialog>
    </FormItem>
  );
}

export default PrescriptionEndDate;
