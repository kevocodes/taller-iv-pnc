import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppointmentPatientRecordsContentProps {
  records: string[];
}

function AppointmentPatientRecordsContent({
  records,
}: AppointmentPatientRecordsContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Historial del paciente</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-60">
        {records?.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2">
            {records.map((record) => (
              <Badge
                key={crypto.randomUUID()}
                variant={"outline"}
                className="text-muted-foreground text-sm"
              >
                {record}
              </Badge>
            ))}
          </div>
        )}

        {records?.length === 0 && (
          <p className="text-muted-foreground text-sm text-center w-full">
            Sin historial médico
          </p>
        )}
      </ScrollArea>
    </DialogContent>
  );
}

export default AppointmentPatientRecordsContent;
