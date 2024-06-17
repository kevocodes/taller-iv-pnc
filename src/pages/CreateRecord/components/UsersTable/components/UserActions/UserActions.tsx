import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { RoleEnum, UserFromAPI } from "@/models/user.model";
import OwnAppointmentsPrescriptionsButton from "./components/OwnAppointmentsPrescriptions/OwnAppointmentsPrescriptionsButton";
import OwnAppointmentsPrescriptionsContent from "./components/OwnAppointmentsPrescriptions/OwnAppointmentsPrescriptionsContent";
import RecordAdd from "./components/RecordAdd/RecordAdd";
import { useAuth } from "@/stores/auth.store";

interface UserActionsProps {
  user: UserFromAPI;
}

function UserActions({ user }: UserActionsProps) {
  const userAuthenticaded = useAuth((state) => state.user);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isAddRecordDialogOpen, setIsAddRecordDialogOpen] = useState(false);

  return (
    <DropdownMenu
      modal={false}
      open={showDropdown}
      onOpenChange={setShowDropdown}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open actions menu</span>
          <MoreHorizontal className="h-6 w-6 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>

        <RecordAdd
          user={user}
          isDialogOpen={isAddRecordDialogOpen}
          setDialogOpen={setIsAddRecordDialogOpen}
          setShowDropdown={setShowDropdown}
        />

        {userAuthenticaded!.roles.filter((r) => r.name === RoleEnum.DOCTOR)
          .length > 0 && (
          <Dialog onOpenChange={(change) => setShowDropdown(change)}>
            <OwnAppointmentsPrescriptionsButton />
            <OwnAppointmentsPrescriptionsContent user={user} />
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserActions;
