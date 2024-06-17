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
import { AppointmentOwn, AppointmentStatus } from "@/models/appointment.model";
import OwnAppointmentsPrescriptionsButton from "./components/OwnAppointmentsPrescriptions/OwnAppointmentsPrescriptionsButton";
import OwnAppointmentsPrescriptionsContent from "./components/OwnAppointmentsPrescriptions/OwnAppointmentsPrescriptionsContent";
import OwnAppointmentCancelButton from "./components/CancelOwnAppointment/OwnAppointmentCancelButton";
import OwnAppointmentCancelContent from "./components/CancelOwnAppointment/OwnAppointmentCancelContent";

interface OwnAppointmentsActionsProps {
  appointment: AppointmentOwn;
}

function OwnAppointmentsActions({ appointment }: OwnAppointmentsActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

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
        <Dialog onOpenChange={(change) => setShowDropdown(change)}>
          <OwnAppointmentsPrescriptionsButton />
          <OwnAppointmentsPrescriptionsContent
            prescriptions={appointment.appointmentPrescriptions}
          />
        </Dialog>

        {appointment.status !== AppointmentStatus.CANCELED && (
          <Dialog
            open={isCancelDialogOpen}
            onOpenChange={(change) => {
              setIsCancelDialogOpen(change);
              setShowDropdown(change);
            }}
          >
            <OwnAppointmentCancelButton />
            <OwnAppointmentCancelContent
              appointment={appointment}
              setOpen={setIsCancelDialogOpen}
              setShowDropdown={setShowDropdown}
            />
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OwnAppointmentsActions;
