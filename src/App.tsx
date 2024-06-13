import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NoRequireAuth from "@/guards/publicRoute.guard";
import AppProvider from "@/providers/AppProvider";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import AppLayout from "@/layouts/AppLayout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import getDefaultRedirectByRole from "@/utils/getDefaultRedirectByRole";
import { useAuth } from "@/stores/auth.store";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import RequireAuth from "@/guards/privateRoute.guard";
import { RoleEnum } from "@/models/user.model";
import Users from "@/pages/Users/Users";
import { validateSession } from "./services/auth.service";
import { createAppUserFromResponseUser } from "./utils/createAppUserFromResponseUser";
import UserChangeRole from "@/pages/UserChangeRole/UserChangeRole";
import CreateRecord from "@/pages/CreateRecord/CreateRecord";
import Records from "@/pages/Records/Records";
import RequestAppointment from "@/pages/RequestAppointment/RequestAppointment";
import Appointments from "@/pages/Appointments/Appointments";
import AppointmentApprove from "@/pages/AppointmentApprove/AppointmentApprove";
import OwnAppointments from "@/pages/OwnAppointments/OwnAppointments";
import AppointmentsToAttend from "@/pages/AppointmentsToAttend/AppointmentsToAttend";
import AppointmentAttend from "@/pages/AppointmentAttend/AppointmentAttend";

function App() {
  const user = useAuth((state) => state.user);

  const token = useAuth((state) => state.token);
  const setUser = useAuth((state) => state.setUser);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    const validateUser = async (token: string) => {
      try {
        const userInfo = await validateSession(token);
        setUser(createAppUserFromResponseUser(userInfo));
      } catch (error) {
        logout();
      }
    };

    // Validate user session if token exists
    if (token) validateUser(token);
  }, [token, setUser, logout]);

  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<NoRequireAuth />}>
            <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
            <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />} />
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<AppLayout />}>
            {/* ADMIN USER ROUTES */}
            <Route element={<RequireAuth allowedRoles={[RoleEnum.ADMIN]} />}>
              <Route
                path={PRIVATE_ROUTES.USERS_MANAGEMENT}
                element={<Users />}
              />
              <Route
                path={`${PRIVATE_ROUTES.USERS_CHANGE_ROLE}/:userId`}
                element={<UserChangeRole />}
              />
            </Route>

            {/* PATIENT ROUTES */}
            <Route element={<RequireAuth allowedRoles={[RoleEnum.PATIENT]} />}>
              <Route path={PRIVATE_ROUTES.RECORDS} element={<Records />} />
              <Route
                path={PRIVATE_ROUTES.OWN_APPOINTMENTS}
                element={<OwnAppointments />}
              />
            </Route>

            {/* USER ROUTES */}
            <Route element={<RequireAuth allowedRoles={[RoleEnum.USER]} />}>
              <Route
                path={PRIVATE_ROUTES.REQUEST_APPOINTMENT}
                element={<RequestAppointment />}
              />
            </Route>

            {/* ASSISTANT ROUTES */}
            <Route
              element={<RequireAuth allowedRoles={[RoleEnum.ASSISTANT]} />}
            >
              <Route
                path={PRIVATE_ROUTES.APPROVE_APPOINTMENT}
                element={<Appointments />}
              />

              <Route
                path={`${PRIVATE_ROUTES.APPROVE_APPOINTMENT}/:appointmentId`}
                element={<AppointmentApprove />}
              />
            </Route>

            {/* DOCTOR ROUTES */}
            <Route element={<RequireAuth allowedRoles={[RoleEnum.DOCTOR]} />}>
              <Route
                path={PRIVATE_ROUTES.ATTEND_APPOINTMENT}
                element={<AppointmentsToAttend />}
              />

              <Route
                path={`${PRIVATE_ROUTES.ATTEND_APPOINTMENT}/:appointmentId`}
                element={<AppointmentAttend />}
              />
            </Route>

            {/* DOCTOR AND ASSISTANT ROUTES */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[RoleEnum.ASSISTANT, RoleEnum.DOCTOR]}
                />
              }
            >
              <Route
                path={PRIVATE_ROUTES.ADD_RECORD}
                element={<CreateRecord />}
              />
            </Route>
          </Route>

          {/* DEFAULT REDIRECT AND 404 */}
          <Route
            path="*"
            element={<Navigate to={getDefaultRedirectByRole(user?.roles)} />}
          />
        </Routes>
      </Router>
      <Toaster />
    </AppProvider>
  );
}

export default App;
