import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { ResponseError } from "@/models/ResponseError.model";
import { getUsers } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UsersTable from "./components/UsersTable/UsersTable";
import { usersColumns } from "./components/UsersTable/constants/columns";
import { useUsers } from "@/stores/users.store";
import { useTitle } from "@/hooks/useTitle";

function Users() {
  useTitle("Administrar roles usuarios");

  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);

  const users = useUsers((state) => state.users);
  const setUsers = useUsers((state) => state.setUsers);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getUsers(token!);
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
        <h2 className="text-xl font-bold">Administración de roles usuarios</h2>
      </div>

      <UsersTable
        loading={loading}
        data={users.filter((u) => u.username !== user?.username)}
        columns={usersColumns}
      />
    </PageContainer>
  );
}

export default Users;
