import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppointmentDoctorContentProps {
  doctors: string[];
}

function AppointmentDoctorContent({ doctors }: AppointmentDoctorContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Doctores de la cita</DialogTitle>
      </DialogHeader>

      <ScrollArea className="max-h-60">
        <div className="flex flex-wrap gap-2 w-full justify-center pr-1">
          {doctors.length > 0 &&
            doctors.map((doctor) => (
              <Badge key={crypto.randomUUID()} className="text-sm">
                {doctor.toLowerCase()}
              </Badge>
            ))}

          {doctors.length === 0 && (
            <p className="text-muted-foreground">No hay doctores</p>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
}

export default AppointmentDoctorContent;
