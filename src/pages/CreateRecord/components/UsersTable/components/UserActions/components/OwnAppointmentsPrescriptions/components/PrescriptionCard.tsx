import { Badge } from "@/components/ui/badge";
import { Prescription } from "@/models/prescription.model";
import dayjs from "dayjs";
import { CalendarClock, Clock, Tablets } from "lucide-react";

interface PrescriptionCardProps {
  prescription: Prescription;
}

function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  return (
    <Badge
      className="w-fit flex flex-col justify-center items-start font-normal text-muted-foreground gap-1 p-2"
      variant="outline"
    >
      <div className="flex gap-2 justify-center items-center">
        <Tablets size={14} /> {prescription.medicine}
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Clock size={14} />
        {prescription.dose}
      </div>
      <div className="flex gap-2 justify-center items-center">
        <CalendarClock size={14} />
        {dayjs(prescription.prescriptionEndLocalDateTime).format("DD/MM/YYYY")}
      </div>
    </Badge>
  );
}

export default PrescriptionCard;
