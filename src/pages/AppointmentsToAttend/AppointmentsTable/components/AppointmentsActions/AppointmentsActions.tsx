import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { Appointment, AppointmentStatus } from "@/models/appointment.model";
import AppointmentDoctorsButton from "./components/AppointmentDoctor/AppointmentDoctorsButton";
import AppointmentDoctorContent from "./components/AppointmentDoctor/AppointmentDoctorContent";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import AppointmentPatientRecordsButton from "./components/AppointmentPatientRecords/AppointmentPatientRecordsButton";
import AppointmentPatientRecordsContent from "./components/AppointmentPatientRecords/AppointmentPatientRecordsContent";

interface AppointmentsActionsProps {
  appointment: Appointment;
  doctors: string[];
  records: string[];
}

function AppointmentsActions({
  appointment,
  doctors,
  records,
}: AppointmentsActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

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

        {appointment.status !== AppointmentStatus.CANCELED &&
          appointment.status !== AppointmentStatus.FINISHED && (
            <Link
              to={`${PRIVATE_ROUTES.ATTEND_APPOINTMENT}/${appointment.idAppointment}`}
            >
              <DropdownMenuItem className="cursor-pointer">
                Atender cita
              </DropdownMenuItem>
            </Link>
          )}

        <Dialog onOpenChange={(change) => setShowDropdown(change)}>
          <AppointmentDoctorsButton />
          <AppointmentDoctorContent doctors={doctors} />
        </Dialog>

        <Dialog onOpenChange={(change) => setShowDropdown(change)}>
          <AppointmentPatientRecordsButton />
          <AppointmentPatientRecordsContent records={records} />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AppointmentsActions;
