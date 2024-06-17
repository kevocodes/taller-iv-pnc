import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrescriptionCard from "./components/PrescriptionCard";
import { UserFromAPI } from "@/models/user.model";
import { Prescription } from "@/models/prescription.model";
import { useEffect, useState } from "react";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { getPatientPrescriptions } from "@/services/prescriptions.service";
import { useAuth } from "@/stores/auth.store";

interface EventActionDeleteDialogProps {
  user: UserFromAPI;
}

function OwnAppointmentsPrescriptionsContent({
  user,
}: EventActionDeleteDialogProps) {
  const token = useAuth((state) => state.token);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        setLoading(true);
        const prescriptions = await getPatientPrescriptions(
          user.idUser,
          token!
        );
        setPrescriptions(prescriptions);
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
    }

    fetchPrescriptions();
  }, [user, token]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Prescripciones vigentes del paciente</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-60">
        <div className="flex flex-wrap gap-2 w-full justify-center pr-1">
        {loading && (<p className="text-muted-foreground">cargando...</p>)}

          {!loading && prescriptions.length > 0 &&
            prescriptions.map((prescription) => (
              <PrescriptionCard
                prescription={prescription}
                key={prescription.idPrescription}
              />
            ))}

          {!loading && prescriptions.length === 0 && (
            <p className="text-muted-foreground">No hay prescripciones</p>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}

export default OwnAppointmentsPrescriptionsContent;
