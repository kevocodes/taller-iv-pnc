import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RecordAdd from "./RecordAdd/RecordAdd";
import { useAppointment } from "@/stores/appointment.store";
import { Badge } from "@/components/ui/badge";

function AppointmentRecord() {
  const appointment = useAppointment((state) => state.appointment);
  const records = useAppointment((state) => state.userMedicalRecords);

  return (
    <div className="w-full max-w-3xl bg-background p-4 rounded-md flex flex-col gap-4">
      <div className="w-full flex gap-4 justify-between items-start sm:items-center flex-col sm:flex-row">
        <p className="font-bold">Historial médico</p>
        {appointment && <RecordAdd user={appointment.user} />}
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-muted-foreground">
            Registros médicos
          </AccordionTrigger>
          <AccordionContent>
            {records.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-2">
                {records.map((record) => (
                  <Badge key={record.idRecord} variant={"outline"} className="text-muted-foreground">
                    {record.reason}
                  </Badge>
                ))}
              </div>
            )}

            {records.length === 0 && (
              <p className="text-muted-foreground text-sm text-center w-full">
                Sin historial médico
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AppointmentRecord;
