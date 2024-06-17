import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import StatusFilter from "./components/StatusFilter";
import { useOwnAppointments } from "@/stores/ownppointments.store";

interface OwnAppointmentsTableToolbarProps<TData> {
  table: Table<TData>;
}

export function OwnAppointmentsTableToolbar<TData>({
  table,
}: OwnAppointmentsTableToolbarProps<TData>) {
  const status = useOwnAppointments((state) => state.statusFilter);
  const setStatusFilter = useOwnAppointments((state) => state.setStatusFilter);

  const isFiltered = table.getState().columnFilters.length > 0 || status !== "todos";

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setStatusFilter("todos");
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
      <StatusFilter />

      <Separator orientation="vertical" className="hidden sm:block h-4" />
      <Separator orientation="horizontal" className="sm:hidden block w-full" />

      <Input
        placeholder="Filtrar por razón..."
        value={(table.getColumn("reason")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("reason")?.setFilterValue(event.target.value)
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
