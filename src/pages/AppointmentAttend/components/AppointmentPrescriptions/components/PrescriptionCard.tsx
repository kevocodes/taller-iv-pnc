import { Badge } from "@/components/ui/badge";
import { Prescription } from "@/models/prescription.model";
import { usePrescriptions } from "@/stores/prescriptions.store";
import dayjs from "dayjs";
import { CalendarClock, Clock, Tablets, Trash } from "lucide-react";

interface PrescriptionCardProps {
  prescription: Prescription;
  isHistory?: boolean;
}

function PrescriptionCard({ prescription, isHistory }: PrescriptionCardProps) {
  const removePrescription = usePrescriptions((state) => state.removePrescription);

  const handleClick = () => {
    removePrescription(prescription)
  }

  if (isHistory) {
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

  return (
    <Badge
      onClick={handleClick}
      className="w-fit flex flex-col justify-center items-start font-normal text-muted-foreground gap-1 p-2 cursor-pointer relative group hover:border-destructive/60"
      variant="outline"
    >
      <div className="w-full h-full bg-destructive/50 absolute top-0 bottom-0 left-0 right-0 group-hover:grid place-content-center hidden rounded-sm">
        <Trash className="text-destructive/60"/>
      </div>
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
