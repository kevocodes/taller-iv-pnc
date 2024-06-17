import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface UserTableToolbarProps<TData> {
  table: Table<TData>;
}

export function UserTableToolbar<TData>({
  table,
}: UserTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleResetFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center gap-2">
      <Input
        placeholder="Filtrar por nombre de usuario..."
        value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("username")?.setFilterValue(event.target.value)
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
