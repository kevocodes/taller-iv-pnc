import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function OwnAppointmentCancelButton() {
  return (
    <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
      <DropdownMenuItem className="focus:bg-destructive focus:text-destructive-foreground cursor-pointer">
        Cancelar cita
      </DropdownMenuItem>
    </DialogTrigger>
  );
}

export default OwnAppointmentCancelButton;
