import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useScheduleAppointments } from "@/stores/scheduleAppointments.store";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

function ScheduleDate() {
  const date = useScheduleAppointments((state) => state.date);
  const setDate = useScheduleAppointments((state) => state.setDate);

  const handleSelect = (inputDate: Date | undefined) => {
    if (!inputDate) return;

    const newDate = dayjs(inputDate).toISOString();

    setDate(newDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:max-w-[250px] justify-center text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            dayjs(date).format("DD/MM/YYYY")
          ) : (
            <span>Fecha</span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-auto">
        <Calendar
          mode="single"
          selected={dayjs(date).toDate()}
          onSelect={handleSelect}
          initialFocus
        />
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleDate;
