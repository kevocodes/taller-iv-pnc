import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  AppointmentSchedule,
} from "@/models/appointment.model";
import AppointmentsActions from "../components/AppointmentsActions/AppointmentsActions";

export const prescriptAppointmentColumns: Array<
  ColumnDef<AppointmentSchedule>
> = [
  {
    header: "Usuario",
    id: "user",
    cell: ({ row }) => {
      const schedule = row.original;
      const user = schedule.appointment.user;

      return <p>{user.username}</p>;
    },
    filterFn: (row, _, filterValue) => {
      const value = row.original.appointment.user.username.toLowerCase();

      return value.includes(filterValue);
    },
  },
  {
    header: "Razón",
    accessorKey: "appointment.reason",
  },
  {
    header: "Estado",
    accessorKey: "appointment.status",
  },
  {
    header: "Fecha de solicitud",
    accessorKey: "appointmentRequestDateTime",
    cell: ({ row }) => {
      const schedule = row.original;
      const dateTime = schedule.appointment.appointmentRequestDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    header: "Fecha de realización",
    accessorKey: "appointmentRealizationDateTime",
    cell: ({ row }) => {
      const schedule = row.original;
      const dateTime = schedule.appointment.appointmentRealizationDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    header: "Fecha de finalización",
    accessorKey: "appointmentEndDateTime",
    cell: ({ row }) => {
      const schedule = row.original;
      const dateTime = schedule.appointment.appointmentEndDateTime;

      return (
        <p>{dateTime ? dayjs(dateTime).format("DD/MM/YYYY HH:mm") : "-"}</p>
      );
    },
  },
  {
    id: "control",
    cell: ({ row }) => {
      const schedule = row.original;
      const appointment = schedule.appointment;

      return (
        <AppointmentsActions
          appointment={appointment}
          doctors={schedule.doctors}
          records={schedule.record}
        />
      );
    },
  },
];
