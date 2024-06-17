import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CreatePrescription from "./components/CreatePrescription/CreatePrescription";
import { usePrescriptions } from "@/stores/prescriptions.store";
import PrescriptionCard from "./components/PrescriptionCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ResponseError } from "@/models/ResponseError.model";
import { toast } from "sonner";
import { createPrescriptions } from "@/services/clinic.service";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { LoaderCircle } from "lucide-react";

function AppointmentPrescriptions() {
  const token = useAuth((state) => state.token);
  const appointment = useAppointment((state) => state.appointment);
  const addPrescriptionsToHistory = useAppointment(
    (state) => state.addAppointmentPrescriptions
  );
  const prescriptions = usePrescriptions((state) => state.prescriptions);
  const setPrescriptions = usePrescriptions((state) => state.setPrescriptions);
  const appointmentPrescriptions = useAppointment(
    (state) => state.appointmentPrescriptions
  );

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      const message = await createPrescriptions(
        appointment!.idAppointment,
        prescriptions,
        token!
      );
      toast.success(message);
      addPrescriptionsToHistory(prescriptions);
      setPrescriptions([]);
    } catch (error) {
      if (error instanceof ResponseError) return toast.error(error.message);

      if (error instanceof Error) return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-background p-4 rounded-md flex flex-col gap-4">
      <div className="w-full flex gap-4 justify-between items-start sm:items-center flex-col sm:flex-row">
        <p className="font-bold">Prescripciónes</p>
        <CreatePrescription />
      </div>

      {prescriptions.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-muted-foreground">
              Prescripciones pendientes de agregar
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {prescriptions.length > 0 &&
                  prescriptions.map((prescription) => (
                    <PrescriptionCard
                      prescription={prescription}
                      key={prescription.idPrescription}
                    />
                  ))}

                {prescriptions.length === 0 && (
                  <p className="text-muted-foreground text-sm text-center w-full">
                    Sin prescripciones por añadir
                  </p>
                )}
              </div>
              <Button
                className="flex gap-2"
                onClick={handleSave}
                disabled={loading}
              >
                {loading && (
                  <LoaderCircle size={16} className="animate-spin mr-2" />
                )}
                Guardar
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-muted-foreground">
            Listado de prescripciones
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 w-full justify-center">
              {appointmentPrescriptions.length > 0 &&
                appointmentPrescriptions.map((prescription) => (
                  <PrescriptionCard
                    prescription={prescription}
                    key={prescription.idPrescription}
                    isHistory
                  />
                ))}

              {appointmentPrescriptions.length === 0 && (
                <p className="text-muted-foreground text-sm text-center w-full">
                  Sin prescripciones
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AppointmentPrescriptions;
