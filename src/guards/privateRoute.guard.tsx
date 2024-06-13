import { PUBLIC_ROUTES } from "@/constants/routes";
import { RoleEnum } from "@/models/user.model";
import { useAuth } from "@/stores/auth.store";
import getDefaultRedirectByRole from "@/utils/getDefaultRedirectByRole";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireAuthProps {
  allowedRoles: RoleEnum[];
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const location = useLocation();
  const user = useAuth((state) => state.user);

  if (!user) {
    return (
      <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />
    );
  }

  if (!allowedRoles.some((role) => user.roles.some((r) => r.name === role))) {
    return <Navigate to={getDefaultRedirectByRole(user.roles)} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
