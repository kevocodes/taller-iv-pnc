import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { getRecords } from "@/services/record.service";
import { useAuth } from "@/stores/auth.store";
import { useRecords } from "@/stores/records.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import RecordsTable from "./components/RecordsTable/RecordsTable";
import { recordsColumn } from "./components/RecordsTable/constants/columns";

function Records() {
  useTitle("Historial médico");

  const token = useAuth((state) => state.token);

  const records = useRecords((state) => state.records);
  const setRecords = useRecords((state) => state.setRecords);
  const startDate = useRecords((state) => state.startDate);
  const setStartDate = useRecords((state) => state.setStartDate);
  const endDate = useRecords((state) => state.endDate);
  const setEndDate = useRecords((state) => state.setEndDate);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getRecords(token!, startDate, endDate);
        setRecords(results);
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

  }, [token, setRecords, startDate, endDate]);

  useEffect(() => {
    return () => {
      setRecords([]);
      setStartDate("");
      setEndDate("");
    }
  }, [setEndDate, setRecords, setStartDate]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3 mb-4">
        <h2 className="text-xl font-bold">Historial médico</h2>
      </div>

      <RecordsTable loading={loading} data={records} columns={recordsColumn} />
    </PageContainer>
  );
}

export default Records;
