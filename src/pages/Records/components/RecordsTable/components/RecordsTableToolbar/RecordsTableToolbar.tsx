import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRecords } from "@/stores/records.store";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import RecordEndDate from "./components/RecordEndDate/RecordEndDate";
import RecordStartDate from "./components/RecordStartDate/RecordStartDate";

interface UserTableToolbarProps<TData> {
  table: Table<TData>;
}

export function RecordsTableToolbar<TData>({
  table,
}: UserTableToolbarProps<TData>) {
  const startDate = useRecords((state) => state.startDate);
  const endDate = useRecords((state) => state.endDate);
  const setStartDate = useRecords((state) => state.setStartDate);
  const setEndDate = useRecords((state) => state.setEndDate);

  const isFiltered =
    table.getState().columnFilters.length > 0 || startDate || endDate;

  const handleResetFilters = () => {
    table.resetColumnFilters();
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
      <RecordStartDate />
      <RecordEndDate />

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
