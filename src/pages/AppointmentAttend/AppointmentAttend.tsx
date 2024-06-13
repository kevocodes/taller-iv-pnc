import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ResponseError } from "@/models/ResponseError.model";
import { getAppointmentById } from "@/services/appointment.service";
import { useAppointment } from "@/stores/appointment.store";
import { useAuth } from "@/stores/auth.store";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import CreatePrescriptionForm from "./components/CreatePrescription/components/CreatePrescriptionForm/CreatePrescriptionForm";
import CreatePrescription from "./components/CreatePrescription/CreatePrescription";

function AppointmentAttend() {
  const { appointmentId } = useParams();

  const [loading, setLoading] = useState(true);

  const token = useAuth((state) => state.token);

  const setAppointment = useAppointment((state) => state.setAppointment);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const appointment = await getAppointmentById(appointmentId!, token!);
        setAppointment(appointment);
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
    };
  }, [token, setAppointment, appointmentId]);

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3 mb-4">
        <Link to={PRIVATE_ROUTES.ATTEND_APPOINTMENT}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Atender cita</h2>
      </div>

      {loading && <p>Cargando...</p>}

      <CreatePrescription />
    </PageContainer>
  );
}

export default AppointmentAttend;
