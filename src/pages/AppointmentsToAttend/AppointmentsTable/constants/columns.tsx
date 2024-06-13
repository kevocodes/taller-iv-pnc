import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Appointment } from "@/models/appointment.model";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";

export const prescriptAppointmentColumns: Array<ColumnDef<Appointment>> = [
  {
    header: "Usuario",
    id: "user",
    cell: ({ row }) => {
      const appointment = row.original;
      const user = appointment.user;

      return <p>{user.username}</p>;
    },
    filterFn: (row, _, filterValue) => {
      const value = row.original.user.username.toLowerCase();

      return value.includes(filterValue);
    },
  },
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
    id: "control",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-2 justify-center items-center">
          <Link to={`${PRIVATE_ROUTES.ATTEND_APPOINTMENT}/${appointment.idAppointment}`}>
            <Button>
              Atender
            </Button>
          </Link>
        </div>
      );
    },
  },
];
