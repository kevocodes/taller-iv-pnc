import { Badge } from "@/components/ui/badge";
import { UserFromAPI } from "@/models/user.model";
import { translateUserRole } from "@/utils/users.util";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export const usersColumns: Array<ColumnDef<UserFromAPI>> = [
  {
    header: "Nombre de usuario",
    accessorKey: "username",
  },
  {
    header: "Correo Electrónico",
    accessorKey: "email",
  },
  {
    header: "Roles",
    accessorKey: "roles",
    cell: ({ row }) => {
      const roles = row.original.roles;

      return (
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {roles.map((role) => {
            return (
              <Badge key={role.id} className="py-1 px-2" variant="outline">
                {translateUserRole(role.name)}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      
      return (
        <Link to={`${PRIVATE_ROUTES.USERS_CHANGE_ROLE}/${user.idUser}`}>
          <Button size={"icon"}>
            <Pencil size={20}/>
          </Button>
        </Link>
      );
    },
  },
];
