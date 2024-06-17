import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { useAuth } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import { prescriptAppointmentColumns } from "./AppointmentsTable/constants/columns";
import { useScheduleAppointments } from "@/stores/scheduleAppointments.store";
import { getSchedule } from "@/services/clinic.service";
import dayjs from "dayjs";

function AppointmentsToAttend() {
  useTitle("Atender citas");

  const token = useAuth((state) => state.token);

  const date = useScheduleAppointments((state) => state.date);
  const appointments = useScheduleAppointments((state) => state.appointments);
  const setAppointments = useScheduleAppointments(
    (state) => state.setAppointments
  );
  const setDay = useScheduleAppointments((state) => state.setDate);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getSchedule(
          token!,
          dayjs(date).format("YYYY-MM-DD")
        );
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
  }, [token, date, setAppointments]);

  useEffect(() => {
    return () => {
      setDay(dayjs().toISOString());
      setAppointments([]);
    };
  }, [setAppointments, setDay]);

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
