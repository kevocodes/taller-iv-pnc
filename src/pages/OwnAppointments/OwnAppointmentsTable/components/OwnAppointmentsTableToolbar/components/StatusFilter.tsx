import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentStatus } from "@/models/appointment.model";
import { useOwnAppointments } from "@/stores/ownppointments.store";
import { Select } from "@radix-ui/react-select";

function StatusFilter() {
  const setStatus = useOwnAppointments((state) => state.setStatusFilter);

  return (
    <Select onValueChange={setStatus}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Estado..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={crypto.randomUUID()} value={"todos"}>
          Todos
        </SelectItem>
        <SelectItem
          key={crypto.randomUUID()}
          value={AppointmentStatus.CANCELED}
        >
          {AppointmentStatus.CANCELED}
        </SelectItem>
        <SelectItem
          key={crypto.randomUUID()}
          value={AppointmentStatus.FINISHED}
        >
          {AppointmentStatus.FINISHED}
        </SelectItem>
        <SelectItem
          key={crypto.randomUUID()}
          value={AppointmentStatus.IN_EXECUTION}
        >
          {AppointmentStatus.IN_EXECUTION}
        </SelectItem>
        <SelectItem key={crypto.randomUUID()} value={AppointmentStatus.PENDING}>
          {AppointmentStatus.PENDING}
        </SelectItem>
        <SelectItem
          key={crypto.randomUUID()}
          value={AppointmentStatus.PENDING_EXECUTION}
        >
          {AppointmentStatus.PENDING_EXECUTION}
        </SelectItem>
        <SelectItem
          key={crypto.randomUUID()}
          value={AppointmentStatus.REJECTED}
        >
          {AppointmentStatus.REJECTED}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default StatusFilter;
