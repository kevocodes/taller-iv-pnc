import { UserFromAPI } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import RecordAdd from "../../RecordAdd/RecordAdd";

export const patientColumns: Array<ColumnDef<UserFromAPI>> = [
  {
    header: "Nombre de usuario",
    accessorKey: "username",
  },
  {
    header: "Correo Electrónico",
    accessorKey: "email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return <RecordAdd user={user} />;
    },
  },
];
