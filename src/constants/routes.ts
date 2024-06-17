export enum PUBLIC_ROUTES {
  LOGIN = "/inicio-sesion",
  REGISTER = "/registrarse",
}

export enum PRIVATE_ROUTES {
  USERS_MANAGEMENT = "/administrar-roles",
  USERS_CHANGE_ROLE = `${USERS_MANAGEMENT}/modificar`,
  ADD_RECORD = "/agregar-historial",
  RECORDS = "/historial-medico",
  REQUEST_APPOINTMENT = "/solicitar-cita",
  APPROVE_APPOINTMENT = "/aprobar-citas",
  OWN_APPOINTMENTS = "/mis-citas",
  ATTEND_APPOINTMENT = "/atender-cita",
}

export enum DEFAULT_REDIRECT {
  ADMIN = PRIVATE_ROUTES.USERS_MANAGEMENT,
  DOCTOR = PRIVATE_ROUTES.ADD_RECORD,
  ASSISTANT = PRIVATE_ROUTES.ADD_RECORD,
  PATIENT = PRIVATE_ROUTES.RECORDS,
  USER = PRIVATE_ROUTES.REQUEST_APPOINTMENT,
}
