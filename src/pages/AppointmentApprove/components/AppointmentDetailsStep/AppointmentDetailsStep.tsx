import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { approveAppointment } from "@/services/appointment.service";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AppointmentDetailsStepProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function AppointmentDetailsStep({ setStep }: AppointmentDetailsStepProps) {
  const navigate = useNavigate();

  const token = useAuth((state) => state.token);

  const doctors = useAppointment((state) => state.doctors);
  const specialties = useAppointment((state) => state.specialities);
  const appointment = useAppointment((state) => state.appointment);
  const data = useAppointment((state) => state.approveInformation);

  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].idUser);
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    specialties[0].idSpecialty
  );

  const [newAppointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetails[]
  >([]);

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

    // Check if the doctor is already added to the list
    const isDoctorAlreadyAdded = newAppointmentDetails.some(
      (appointmentDetail) =>
        appointmentDetail.idUser === newAppointmentDetail.idUser &&
        appointmentDetail.idSpecialty !== newAppointmentDetail.idSpecialty
    );

    if (isDoctorAlreadyAdded)
      return toast.error("El doctor ya ha sido agregado para atender la cita");

    // Check if trying to add the same doctor with the same specialty
    const needsToREmove = newAppointmentDetails.some(
      (appointmentDetail) =>
        appointmentDetail.idUser === newAppointmentDetail.idUser &&
        appointmentDetail.idSpecialty === newAppointmentDetail.idSpecialty
    );

    // Remove the doctor if it's already added
    if (needsToREmove) {
      return setAppointmentDetails((prev) =>
        prev.filter(
          (appointmentDetail) =>
            appointmentDetail.idUser !== newAppointmentDetail.idUser ||
            appointmentDetail.idSpecialty !== newAppointmentDetail.idSpecialty
        )
      );
    }

    // Check if there are a doctor with the same specialty
    const isSpecialtyAlreadyAdded = newAppointmentDetails.some(
      (appointmentDetail) =>
        appointmentDetail.idSpecialty === newAppointmentDetail.idSpecialty
    );

    if (isSpecialtyAlreadyAdded)
      return toast.error(
        "Ya hay un doctor asignado a esta especialidad para atender la cita"
      );

    setAppointmentDetails((prev) => [...prev, newAppointmentDetail]);
  };

  const handleReturn = () => {
    setStep(1);
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-background p-4 rounded-md max-w-3xl flex flex-col gap-8">
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

      <div className="w-full flex flex-col sm:flex-row-reverse gap-4">
        <Button disabled={loading} onClick={handleApprove}>
          {loading && <LoaderCircle size={16} className="animate-spin mr-2" />}
          Aprobar
        </Button>
        <Button variant="outline" onClick={handleReturn}>
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default AppointmentDetailsStep;
