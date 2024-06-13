import { TimePicker } from "@/components/platform/TimePicker/TimePicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { approveAppointmentSchema } from "@/schemas/appointment.schema";
import dayjs from "dayjs";
import { Clock } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

interface PermitStartTimeProps {
  field: ControllerRenderProps<
    z.infer<typeof approveAppointmentSchema>,
    "realizationDateTime"
  >;
  className?: string;
}

function AppointmentRealizationTime({ field, className }: PermitStartTimeProps) {
  return (
    <FormItem className={cn("flex flex-col w-full", className)}>
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
              <Clock className="mr-2 h-4 w-4" />

              {field.value ? (
                dayjs(field.value).format("HH:mm")
              ) : (
                <span>Hora de realización</span>
              )}
            </Button>
          </DialogTrigger>
        </FormControl>
        <FormMessage />

        <DialogContent className="w-auto">
          <TimePicker date={field.value} setDate={field.onChange} />
        </DialogContent>
      </Dialog>
    </FormItem>
  );
}

export default AppointmentRealizationTime;
