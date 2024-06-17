import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { AppointmentOwn } from "@/models/appointment.model";
import OwnAppointmentsActions from "../components/OwnAppointmentsActions/OwnAppointmentsActions";

export const ownAppointmentsColumns: Array<ColumnDef<AppointmentOwn>> = [
  {
    header: "Razón",
    accessorKey: "reason",
  },
  {
    header: "Estado",
    accessorKey: "status",
  },
  {
    header: "Fecha de solicitud",
    accessorKey: "appointmentRequestDateTime",
    cell: ({ row }) => {
      const appointment = row.original;
      const dateTime = appointment.appointmentRequestDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    header: "Fecha de realización",
    accessorKey: "appointmentRealizationDateTime",
    cell: ({ row }) => {
      const appointment = row.original;
      const dateTime = appointment.appointmentRealizationDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    header: "Fecha de finalización",
    accessorKey: "appointmentEndDateTime",
    cell: ({ row }) => {
      const appointment = row.original;
      const dateTime = appointment.appointmentEndDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original;

      return <OwnAppointmentsActions appointment={appointment} />;
    },
  },
];
