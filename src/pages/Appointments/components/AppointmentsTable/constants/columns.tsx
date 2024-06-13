import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Appointment } from "@/models/appointment.model";
import AppointmentRejectConfirmation from "../components/AppointmentRejectConfirmation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";

export const approveAppointmentColumns: Array<ColumnDef<Appointment>> = [
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
    header: "Fecha y hora solicitada",
    accessorKey: "dateTime",
    cell: ({ row }) => {
      const appointment = row.original;
      const dateTime = appointment.appointmentRequestDateTime;

      return <p>{dayjs(dateTime).format("DD/MM/YYYY - HH:mm")}</p>;
    },
  },
  {
    id: "control",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-2 justify-center items-center">
          <AppointmentRejectConfirmation appointment={appointment}/>
          <Link to={`${PRIVATE_ROUTES.APPROVE_APPOINTMENT}/${appointment.idAppointment}`}>
            <Button>
              Aprobar
            </Button>
          </Link>
        </div>
      );
    },
  },
];
