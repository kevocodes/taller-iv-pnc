import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { getAppointmentById } from "@/services/appointment.service";
import {
  DEFAULT_APPROVE_INFORMATION,
  useAppointment,
} from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import AppointmentApproveForm from "./components/AppointmentApproveForm/AppointmentApproveForm";
import { getSpecialties } from "@/services/specialties.service";
import AppointmentDetailsStep from "./components/AppointmentDetailsStep/AppointmentDetailsStep";

function AppointmentApprove() {
  useTitle("Aprobar cita");

  const { appointmentId } = useParams();

  const [loading, setLoading] = useState(true);

  const token = useAuth((state) => state.token);

  const setAppointment = useAppointment((state) => state.setAppointment);
  const setSpecialties = useAppointment((state) => state.setSpecialties);
  const setDoctors = useAppointment((state) => state.setDoctors);
  const setApproveInformation = useAppointment(
    (state) => state.setApproveInformation
  );

  const [step, setStep] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const appointment = await getAppointmentById(appointmentId!, token!);
        setAppointment(appointment);

        const specialties = await getSpecialties(token!);
        setSpecialties(specialties);
      } catch (error) {
        if (error instanceof ResponseError) {
          return toast.error(error.message);
        }

        if (error instanceof Error) {
          return toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      setAppointment(null);
      setSpecialties([]);
      setDoctors([]);
      setApproveInformation(DEFAULT_APPROVE_INFORMATION);
    };
  }, [token, setAppointment, appointmentId, setSpecialties, setDoctors, setApproveInformation]);

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3 mb-4">
        <Link to={PRIVATE_ROUTES.APPROVE_APPOINTMENT}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Aprobar cita</h2>
      </div>

      {loading && <p>Cargando...</p>}

      {!loading && step === 1 && <AppointmentApproveForm setStep={setStep} />}

      {!loading && step === 2 && <AppointmentDetailsStep setStep={setStep} />}
    </PageContainer>
  );
}

export default AppointmentApprove;
