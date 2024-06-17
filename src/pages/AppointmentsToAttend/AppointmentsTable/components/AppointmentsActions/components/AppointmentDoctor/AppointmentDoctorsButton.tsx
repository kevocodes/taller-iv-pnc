import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function AppointmentDoctorsButton() {
  return (
      <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
        <DropdownMenuItem className="cursor-pointer">
          Ver doctores
        </DropdownMenuItem>
      </DialogTrigger>
  );
}

export default AppointmentDoctorsButton;
