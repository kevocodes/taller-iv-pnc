import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { getOwnAppointments } from "@/services/appointment.service";
import { useAuth } from "@/stores/auth.store";
import { useOwnAppointments } from "@/stores/ownppointments.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OwnAppointmentsTable from "./OwnAppointmentsTable/OwnAppointmentsTable";
import { ownAppointmentsColumns } from "./OwnAppointmentsTable/constants/columns";

function OwnAppointments() {
  useTitle("Mis citas");

  const token = useAuth((state) => state.token);

  const appointments = useOwnAppointments((state) => state.appointments);
  const setAppointments = useOwnAppointments((state) => state.setAppointments);
  const status = useOwnAppointments((state) => state.statusFilter);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getOwnAppointments(token!, status);
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
  }, [setAppointments, token, status]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3 mb-4">
        <h2 className="text-xl font-bold">Mis citas</h2>
      </div>

      <OwnAppointmentsTable
        loading={loading}
        data={appointments.sort(
          (a, b) =>
            new Date(b.appointmentRequestDateTime).getTime() -
            new Date(a.appointmentRequestDateTime).getTime()
        )}
        columns={ownAppointmentsColumns}
      />
    </PageContainer>
  );
}

export default OwnAppointments;
