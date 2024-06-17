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
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ResponseError } from "@/models/ResponseError.model";
import { finishAppointment } from "@/services/appointment.service";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function FinishAppointment() {
  const navigate = useNavigate();
  const appointment = useAppointment((state) => state.appointment);
  const token = useAuth((state) => state.token);

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [loading, setLoading] = useState(false);

  const handleFinishAppointment = async () => {
    try {
      setLoading(true);
      const message = await finishAppointment(
        appointment!.idAppointment,
        token!
      );
      toast.success(message);
      navigate(PRIVATE_ROUTES.ATTEND_APPOINTMENT, { replace: true });
    } catch (error) {
      if (error instanceof ResponseError) {
        return toast.error(error.message);
      }

      if (error instanceof Error) {
        return toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full max-w-3xl">
            <p>Finalizar cita</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Finalizar cita</DialogTitle>
            <DialogDescription>
              Verifica que la cita ha sido atendida en su totalidad antes de
              finalizar la cita.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleFinishAppointment} disabled={loading}>
            {loading && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            <p>Finalizar</p>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full max-w-3xl">
          <p>Finalizar cita</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Finalizar cita</DrawerTitle>
          <DrawerDescription>
            Verifica que la cita ha sido atendida en su totalidad antes de
            finalizar la cita.
          </DrawerDescription>
        </DrawerHeader>
        <Button
          className="mx-4"
          onClick={handleFinishAppointment}
          disabled={loading}
        >
          {loading && <LoaderCircle size={16} className="animate-spin mr-2" />}
          <p>Finalizar</p>
        </Button>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FinishAppointment;
