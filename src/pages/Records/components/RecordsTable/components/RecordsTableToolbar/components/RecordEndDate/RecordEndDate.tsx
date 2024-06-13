import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRecords } from "@/stores/records.store";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";

function RecordEndDate() {
  const endDate = useRecords((state) => state.endDate);
  const setEndDate = useRecords((state) => state.setEndDate);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    const newEndDate = dayjs(date).endOf("day").toISOString();

    setEndDate(newEndDate);
  };

  const handleClear = () => {
    setEndDate("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:max-w-[250px] justify-center text-left font-normal",
            !endDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {endDate ? (
            dayjs(endDate).format("DD/MM/YYYY")
          ) : (
            <span>Fecha de fin</span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-auto">
        <Calendar
          mode="single"
          selected={dayjs(endDate).toDate()}
          onSelect={handleSelect}
          initialFocus
        />
        <Button onClick={handleClear}>Limpiar</Button>
      </DialogContent>
    </Dialog>
  );
}

export default RecordEndDate;
