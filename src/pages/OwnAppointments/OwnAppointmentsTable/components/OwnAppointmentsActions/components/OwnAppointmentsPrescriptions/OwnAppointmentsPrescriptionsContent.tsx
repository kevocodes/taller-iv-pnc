import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrescriptionCard from "./components/PrescriptionCard";
import { Prescription } from "@/models/prescription.model";

interface EventActionDeleteDialogProps {
  prescriptions: Prescription[];
}

function OwnAppointmentsPrescriptionsContent({
  prescriptions,
}: EventActionDeleteDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Prescripciones de la cita</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-60">
        <div className="flex flex-wrap gap-2 w-full justify-center pr-1">
          {prescriptions.length > 0 &&
            prescriptions.map((prescription) => (
              <PrescriptionCard
                prescription={prescription}
                key={prescription.idPrescription}
              />
            ))}

          {prescriptions.length === 0 && (
            <p className="text-muted-foreground">No hay prescripciones</p>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}

export default OwnAppointmentsPrescriptionsContent;
