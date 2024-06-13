import { useAuth } from "@/stores/auth.store";
import getDefaultRedirectByRole from "@/utils/getDefaultRedirectByRole";
import { Navigate, Outlet } from "react-router-dom";

function PublicGuard() {
  const user = useAuth((state) => state.user);

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={getDefaultRedirectByRole(user.roles)} replace />;
}

export default PublicGuard;
