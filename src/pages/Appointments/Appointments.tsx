import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { getPendingAppointments } from "@/services/appointment.service";
import { useAuth } from "@/stores/auth.store";
import { usePendingAppointments } from "@/stores/pendingAppointments";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppointmentsTable from "./components/AppointmentsTable/AppointmentsTable";
import { approveAppointmentColumns } from "./components/AppointmentsTable/constants/columns";

function ApproveAppointment() {
  useTitle("Aprobar citas");

  const token = useAuth((state) => state.token);

  const appointments = usePendingAppointments((state) => state.appointments);
  const setAppointments = usePendingAppointments(
    (state) => state.setAppointments
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getPendingAppointments(token!);
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
        <h2 className="text-xl font-bold">Aprobar solicitudes de citas</h2>
      </div>

      <AppointmentsTable
        loading={loading}
        data={appointments}
        columns={approveAppointmentColumns}
      />
    </PageContainer>
  );
}

export default ApproveAppointment;
