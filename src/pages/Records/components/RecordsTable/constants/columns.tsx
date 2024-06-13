import { ColumnDef } from "@tanstack/react-table";
import { Record } from "@/models/record.model";
import dayjs from "dayjs";

export const recordsColumn: Array<ColumnDef<Record>> = [
  {
    header: "Razón",
    accessorKey: "reason",
  },
  {
    header: "Fecha",
    accessorKey: "dateTime",
    cell: ({ row }) => {
      const record = row.original;
      const dateTime = record.recordDateTime;

      return (
        <p>
          {dayjs(dateTime).format("DD/MM/YYYY")}
        </p>
      );
    },
  },
  {
    header: "Hora",
    accessorKey: "dateTime",
    cell: ({ row }) => {
      const record = row.original;
      const dateTime = record.recordDateTime;

      return (
        <p>
          {dayjs(dateTime).format("HH:mm")}
        </p>
      );
    },
  },
];
