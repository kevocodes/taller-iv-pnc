import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { ResponseError } from "@/models/ResponseError.model";
import { getUserById } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUser } from "@/stores/user.store";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import UserChangeRoleForm from "./components/UserChangeRoleForm";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks/useTitle";

function UserChangeRole() {
  useTitle("Añadir roles al usuario");
  
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);

  const token = useAuth((state) => state.token);

  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getUserById(userId!, token!);
        setUser(results);
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

    return () => setUser(null);
  }, [token, setUser, userId]);

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3 mb-4">
        <Link to={PRIVATE_ROUTES.USERS_MANAGEMENT}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Añadir roles al usuario</h2>
      </div>

      {loading && <p>Cargando...</p>}

      {!loading && <UserChangeRoleForm />}
    </PageContainer>
  );
}

export default UserChangeRole;
