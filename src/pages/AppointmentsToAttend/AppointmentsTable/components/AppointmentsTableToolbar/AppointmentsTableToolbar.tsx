import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useScheduleAppointments } from "@/stores/scheduleAppointments.store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import ScheduleDate from "./components/ScheduleDate/ScheduleDate";
import dayjs from "dayjs";

interface UserTableToolbarProps<TData> {
  table: Table<TData>;
}

export function RecordsTableToolbar<TData>({
  table,
}: UserTableToolbarProps<TData>) {
  const date = useScheduleAppointments((state) => state.date);
  const setDate = useScheduleAppointments((state) => state.setDate);

  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    dayjs(date).startOf("day").toISOString() !==
      dayjs().startOf("day").toISOString();

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setDate(dayjs().toISOString());
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
      <ScheduleDate />

      <Separator orientation="vertical" className="hidden sm:block h-4" />
      <Separator orientation="horizontal" className="sm:hidden block w-full" />

      <Input
        placeholder="Filtrar por nombre de usuario..."
        value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("user")?.setFilterValue(event.target.value)
        }
        className="h-8 w-full sm:max-w-[250px] bg-background"
      />

      {/* <div className="flex items-center justify-center gap-2 self-start"> */}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={handleResetFilters}
          className="h-8 px-2 lg:px-3"
        >
          Reiniciar
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
      {/* </div> */}
    </div>
  );
}
