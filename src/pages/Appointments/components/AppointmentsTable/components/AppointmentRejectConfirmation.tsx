import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ResponseError } from "@/models/ResponseError.model";
import { Appointment } from "@/models/appointment.model";
import { rejectAppointment } from "@/services/appointment.service";
import { useAuth } from "@/stores/auth.store";
import { usePendingAppointments } from "@/stores/pendingAppointments";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AppointmentRejectConfirmationProps {
  appointment: Appointment;
}

function AppointmentRejectConfirmation({
  appointment,
}: AppointmentRejectConfirmationProps) {
  const token = useAuth((state) => state.token);
  const removeAppointment = usePendingAppointments(state => state.removeAppointment)

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    try {
      setLoading(true);
      const message = await rejectAppointment(appointment.idAppointment, token!);
      toast.success(message);
      removeAppointment(appointment.idAppointment)
    } catch (error) {
      if (error instanceof ResponseError) {
        return toast.error(error.message);
      }

      if (error instanceof Error) {
        return toast.error(error.message);
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"default"} className="px-7">
            Rechazar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              ¿Estas seguro/a que deseas rechazar la solicitud?
            </DialogTitle>
            <DialogDescription>
              Esta acción no puede ser revertida. La solicitud será
              completamente rechazada.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleReject}
            variant="default"
            className="w-full"
            disabled={loading}
          >
            {loading && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Rechazar
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"default"} className="px-7">
          Rechazar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            ¿Estas seguro/a que deseas rechazar la solicitud?
          </DrawerTitle>
          <DrawerDescription>
            Esta acción no puede ser revertida. La solicitud será completamente
            rechazada.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <Button onClick={handleReject} variant="default" className="w-full">
            Rechazar
          </Button>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AppointmentRejectConfirmation;
