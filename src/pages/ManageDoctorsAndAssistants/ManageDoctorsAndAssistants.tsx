import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { ResponseError } from "@/models/ResponseError.model";
import { getDoctorsAndAssistants } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUsers } from "@/stores/users.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UsersTable from "./components/UsersTable/UsersTable";
import { usersColumns } from "./components/UsersTable/constants/columns";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function ManageDoctorsAndAssistants() {
  useTitle("Administrar doctores y  asistentes");

  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);

  const users = useUsers((state) => state.users);
  const setUsers = useUsers((state) => state.setUsers);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getDoctorsAndAssistants(token!);
        setUsers(results);
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

    return () => setUsers([]);
  }, [token, setUsers]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3 mb-4">
        <h2 className="text-xl font-bold">
          Administración de médicos y asistentes
        </h2>

        <Link to={`${PRIVATE_ROUTES.CREATE_DOCTOR_OR_ASSISTANT}`} className="w-full sm:w-fit">
          <Button className="w-full">
            <Plus className="mr-2" size={20} />
            Crear
          </Button>
        </Link>
      </div>

      <UsersTable
        loading={loading}
        data={users.filter((u) => u.username !== user?.username)}
        columns={usersColumns}
      />
    </PageContainer>
  );
}

export default ManageDoctorsAndAssistants;
