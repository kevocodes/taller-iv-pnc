import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import {
  getValidAppointments,
} from "@/services/appointment.service";
import { useAuth } from "@/stores/auth.store";
import { usePrescriptAppointments } from "@/stores/prescriptAppointments.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import { prescriptAppointmentColumns } from "./AppointmentsTable/constants/columns";

function AppointmentsToAttend() {
  useTitle("Atender citas");

  const token = useAuth((state) => state.token);

  const appointments = usePrescriptAppointments((state) => state.appointments);
  const setAppointments = usePrescriptAppointments(
    (state) => state.setAppointments
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getValidAppointments(token!);
        setAppointments(results);
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

    return () => setAppointments([]);
  }, [token, setAppointments]);
  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3 mb-4">
        <h2 className="text-xl font-bold">Atender citas</h2>
      </div>

      <AppointmentsTable
        loading={loading}
        data={appointments}
        columns={prescriptAppointmentColumns}
      />
    </PageContainer>
  );
}

export default AppointmentsToAttend;
