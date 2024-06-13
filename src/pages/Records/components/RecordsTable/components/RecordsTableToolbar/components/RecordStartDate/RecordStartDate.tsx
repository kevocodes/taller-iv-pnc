import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRecords } from "@/stores/records.store";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

function RecordStartDate() {
  const startDate = useRecords((state) => state.startDate);
  const setStartDate = useRecords((state) => state.setStartDate);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    const newStartDate = dayjs(date).startOf("day").toISOString();

    setStartDate(newStartDate);
  };

  const handleClear = () => {
    setStartDate("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:max-w-[250px] justify-center text-left font-normal",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            dayjs(startDate).format("DD/MM/YYYY")
          ) : (
            <span>Fecha de inicio</span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-auto">
        <Calendar
          mode="single"
          selected={dayjs(startDate).toDate()}
          onSelect={handleSelect}
          initialFocus
        />

        <Button onClick={handleClear}>Limpiar</Button>
      </DialogContent>
    </Dialog>
  );
}

export default RecordStartDate;
