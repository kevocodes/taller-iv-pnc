import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { API_ROLES } from "@/data/role.data";
import { ResponseError } from "@/models/ResponseError.model";
import { updateUserRole } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUser } from "@/stores/user.store";
import { translateUserRole } from "@/utils/users.util";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function UserChangeRoleForm() {
  const navigate = useNavigate();

  const user = useUser((state) => state.user);
  const token = useAuth((state) => state.token);
  const [role, setRole] = useState(API_ROLES[0].name as string);
  const [newRoles, setNewRoles] = useState<string[]>([]);

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
  };

  const handleAdd = () => {
    setNewRoles((prev) => {
      //toggle role
      if (prev.includes(role)) {
        return prev.filter((r) => r !== role);
      }

      return [...prev, role];
    });
  };

  const handleSave = async () => {
    try {
      const parsedRoles = newRoles.map(
        (role) => API_ROLES.find((r) => r.name === role)!.id
      );

      const message = await updateUserRole(user!.username, parsedRoles, token!);

      toast.success(message);

      navigate(PRIVATE_ROUTES.USERS_MANAGEMENT, { replace: true });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full bg-background p-4 rounded-md max-w-3xl flex flex-col gap-8">
      <div className="flex justify-between gap-2 flex-col sm:flex-row">
        <Select defaultValue={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {API_ROLES.map((role) => (
              <SelectItem key={role.id} value={role.name}>
                {translateUserRole(role.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant={"outline"} onClick={handleAdd}>
          Agregar
        </Button>
      </div>

      <div className="w-full flex flex-col gap-4">
        <p className="font-bold">Roles por agregar</p>

        <div className="flex flex-wrap gap-2">
          {newRoles.map((role) => (
            <Badge
              key={crypto.randomUUID()}
              variant={
                user!.roles.findIndex((r) => r.name === role) > -1
                  ? "destructive"
                  : "sucess"
              }
            >
              {translateUserRole(role)}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant={"default"} onClick={handleSave}>
        Guardar
      </Button>
    </div>
  );
}

export default UserChangeRoleForm;
