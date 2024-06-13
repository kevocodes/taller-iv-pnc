import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import RequestAppointmentForm from "./components/RequestAppointmentForm/RequestAppointmentForm";
import { useTitle } from "@/hooks/useTitle";

function RequestAppointment() {
  useTitle("Solicitar cita");

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3 mb-4">
        <h2 className="text-xl font-bold">Solicitar cita</h2>
      </div>

      <RequestAppointmentForm />
    </PageContainer>
  );
}

export default RequestAppointment;
