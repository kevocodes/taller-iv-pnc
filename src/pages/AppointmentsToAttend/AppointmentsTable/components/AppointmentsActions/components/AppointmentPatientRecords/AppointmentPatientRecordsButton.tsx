import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function AppointmentPatientRecordsButton() {
  return (
      <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
        <DropdownMenuItem className="cursor-pointer">
          Ver historial del paciente
        </DropdownMenuItem>
      </DialogTrigger>
  );
}

export default AppointmentPatientRecordsButton;
