import { PRIVATE_ROUTES } from "@/constants/routes";
import { SidebarItem, SidebarItemLogout } from "./SidebarItem";

import { useSidebar } from "@/stores/sidebar.store";
import {
  CalendarCheck,
  CalendarDays,
  ClipboardPlus,
  FileClock,
  LogOut,
  Pill,
  User,
} from "lucide-react";
import { RoleEnum } from "@/models/user.model";

interface SidebarContentProps {
  isMobile?: boolean;
}

export const SidebarContent = ({ isMobile }: SidebarContentProps) => {
  const isOpen = useSidebar((state) => state.isOpen);
  const isSidebarOpen = !isMobile ? isOpen : true;

  return (
    <>
      <SidebarItem
        label="Solicitar cita"
        to={PRIVATE_ROUTES.REQUEST_APPOINTMENT}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.USER]}
      >
        <CalendarDays size={24} />
      </SidebarItem>

      <SidebarItem
        label="Administrar Usuarios"
        to={PRIVATE_ROUTES.USERS_MANAGEMENT}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.ADMIN]}
      >
        <User size={24} />
      </SidebarItem>

      <SidebarItem
        label="Historial de pacientes"
        to={PRIVATE_ROUTES.ADD_RECORD}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.ASSISTANT, RoleEnum.DOCTOR]}
      >
        <User size={24} />
      </SidebarItem>

      <SidebarItem
        label="Historial médico"
        to={PRIVATE_ROUTES.RECORDS}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.PATIENT]}
      >
        <FileClock size={24} />
      </SidebarItem>

      <SidebarItem
        label="Mis citas"
        to={PRIVATE_ROUTES.OWN_APPOINTMENTS}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.PATIENT]}
      >
        <ClipboardPlus size={24} />
      </SidebarItem>

      <SidebarItem
        label="Aprobar citas"
        to={PRIVATE_ROUTES.APPROVE_APPOINTMENT}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.ASSISTANT]}
      >
        <CalendarCheck size={24} />
      </SidebarItem>

      <SidebarItem
        label="Atender citas"
        to={PRIVATE_ROUTES.ATTEND_APPOINTMENT}
        isSidebarOpen={isSidebarOpen}
        allowedRoles={[RoleEnum.DOCTOR]}
      >
        <Pill size={24} />
      </SidebarItem>

      <SidebarItemLogout label="Cerrar sesión" isSidebarOpen={isSidebarOpen}>
        <LogOut size={24} />
      </SidebarItemLogout>
    </>
  );
};
