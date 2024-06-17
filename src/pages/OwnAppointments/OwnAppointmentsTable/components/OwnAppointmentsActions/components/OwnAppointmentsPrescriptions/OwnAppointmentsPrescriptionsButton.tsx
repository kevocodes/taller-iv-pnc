import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function OwnAppointmentsPrescriptionsButton() {
  return (
      <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
        <DropdownMenuItem className="cursor-pointer">
          Ver prescripciones
        </DropdownMenuItem>
      </DialogTrigger>
  );
}

export default OwnAppointmentsPrescriptionsButton;
