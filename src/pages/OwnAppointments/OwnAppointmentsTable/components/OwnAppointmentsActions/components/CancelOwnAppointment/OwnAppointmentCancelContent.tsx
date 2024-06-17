import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResponseError } from "@/models/ResponseError.model";
import { AppointmentOwn, AppointmentStatus } from "@/models/appointment.model";
import { cancelAppointment } from "@/services/appointment.service";
import { useAuth } from "@/stores/auth.store";
import { useOwnAppointments } from "@/stores/ownppointments.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface OwnAppointmentCancelContentProps {
  appointment: AppointmentOwn;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function OwnAppointmentCancelContent({
  appointment,
  setOpen,
  setShowDropdown
}: OwnAppointmentCancelContentProps) {
  const [loading, setLoading] = useState(false);

  const token = useAuth((state) => state.token);
  const changeAppointmentStatus = useOwnAppointments(
    (state) => state.changeAppointmentStatus
  );

  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await cancelAppointment(
        appointment.idAppointment,
        token!
      );

      changeAppointmentStatus(
        appointment.idAppointment,
        AppointmentStatus.CANCELED
      );
      toast.success(response);
      setOpen(false);
      setShowDropdown(false);
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }

      if (error instanceof Error) {
        toast.error("Ha ocurrido un error al cancelar la cita");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Estas seguro/a que deseas cancelar la cita?</DialogTitle>
        <DialogDescription>
          Esta acción no puede ser revertida. La cita será completamente
          cancelada y no podrá revertirse.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button className="w-full" onClick={handleCancel} variant="destructive">
          {loading && <LoaderCircle size={16} className="animate-spin mr-2" />}
          Cancelar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default OwnAppointmentCancelContent;
