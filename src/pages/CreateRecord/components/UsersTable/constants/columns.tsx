import { UserFromAPI } from "@/models/user.model";
import { ColumnDef } from "@tanstack/react-table";
import UserActions from "../components/UserActions/UserActions";

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

      return <UserActions user={user} />;
    },
  },
];
