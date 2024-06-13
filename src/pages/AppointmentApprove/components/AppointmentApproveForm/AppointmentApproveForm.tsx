import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ResponseError } from "@/models/ResponseError.model";
import { AppointmentDetails } from "@/models/appointment.model";
import { approveAppointmentSchema } from "@/schemas/appointment.schema";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import AppointmentRealizationTime from "./components/AppointmentRealizationTime/AppointmentRealizationTime";
import { approveAppointment } from "@/services/appointment.service";

function AppointmentApproveForm() {
  const navigate = useNavigate();

  const token = useAuth((state) => state.token);

  const doctors = useAppointment((state) => state.doctors);
  const specialties = useAppointment((state) => state.specialities);
  const appointment = useAppointment((state) => state.appointment);

  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].idUser);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    specialties[0].idSpecialty
  );
  const [newAppointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetails[]
  >([]);

  const form = useForm<z.infer<typeof approveAppointmentSchema>>({
    resolver: zodResolver(approveAppointmentSchema),
    defaultValues: {
      duration: String(15),
      realizationDateTime: dayjs(
        appointment?.appointmentRequestDateTime
      ).toDate(),
    },
  });

  const handleDoctorChange = (selectedDoctor: string) => {
    setSelectedDoctor(selectedDoctor);
  };

  const handleSpecialtyChange = (selectedSpecialty: string) => {
    setSelectedSpecialty(selectedSpecialty);
  };

  const handleAdd = () => {
    const newAppointmentDetail = {
      idUser: selectedDoctor,
      idSpecialty: selectedSpecialty,
    };

    // Toggle appointment details
    const isDoctorAlreadyAdded = newAppointmentDetails.some(
      (appointmentDetail) =>
        appointmentDetail.idUser === newAppointmentDetail.idUser
    );

    if (isDoctorAlreadyAdded)
      return toast.error("El doctor ya ha sido agregado para atender la cita");

    setAppointmentDetails((prev) => [...prev, newAppointmentDetail]);
  };

  const handleApprove = async (
    data: z.infer<typeof approveAppointmentSchema>
  ) => {
    try {
      if (newAppointmentDetails.length === 0)
        return toast.error("Debes asignar un doctor y su especialidad");

      const message = await approveAppointment(
        appointment!,
        newAppointmentDetails,
        data,
        token!
      );

      toast.success(message);
      navigate(PRIVATE_ROUTES.APPROVE_APPOINTMENT, { replace: true });
    } catch (error) {
      if (error instanceof ResponseError) {
        toast.error(error.message);
      }

      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full bg-background p-4 rounded-md max-w-3xl flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleApprove)}
      >
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">Agrega doctores y su especialidad</p>
          <div className="flex justify-between gap-2 flex-col sm:flex-row">
            <div className="flex justify-between gap-2 flex-col sm:flex-row">
              <Select
                defaultValue={selectedDoctor}
                onValueChange={handleDoctorChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Selecciona un doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.idUser} value={doctor.idUser}>
                      {doctor.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                defaultValue={selectedSpecialty}
                onValueChange={handleSpecialtyChange}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Selecciona una especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((speciality) => (
                    <SelectItem
                      key={speciality.idSpecialty}
                      value={speciality.idSpecialty}
                    >
                      {speciality.specialtyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant={"outline"} onClick={handleAdd} type="button">
              Agregar
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">Doctores que atenderan</p>

          <div className="flex flex-wrap gap-2">
            {newAppointmentDetails.map((appointmentDetail) => (
              <Badge key={crypto.randomUUID()} variant={"outline"}>
                {
                  doctors.find(
                    (doctor) => doctor.idUser === appointmentDetail.idUser
                  )?.username
                }
                {" - "}
                {
                  specialties.find(
                    (speciality) =>
                      speciality.idSpecialty === appointmentDetail.idSpecialty
                  )?.specialtyName
                }
              </Badge>
            ))}

            {newAppointmentDetails.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Ningúno seleccionado
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <p className="font-bold">Detalle de la consulta</p>

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración</FormLabel>
                <FormControl>
                  <Input placeholder="5" {...field} type="number" />
                </FormControl>
                <FormDescription>
                  Duración en minutos de la consulta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="realizationDateTime"
            render={({ field }) => <AppointmentRealizationTime field={field} />}
          />
        </div>
        <Button variant={"default"} type="submit">
          Aprobar
        </Button>
      </form>
    </Form>
  );
}

export default AppointmentApproveForm;
