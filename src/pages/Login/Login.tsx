import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import LoginForm from "./components/LoginForm/LoginForm";
import { PUBLIC_ROUTES } from "@/constants/routes";

function Login() {
  useTitle("Iniciar sesión");

  return (
    <main className="min-h-[100dvh] w-full flex">
      <section className="md:w-1/2 2xl:w-2/3 h-100vh relative">
        <img
          src="/auth-background.webp"
          className="w-full h-full object-cover absolute"
        />
        <div className="absolute bg-primary/40 inset-0 "></div>
      </section>

      <section className="w-full md:w-1/2 2xl:w-1/3 flex justify-center items-center p-6">
        <div className="flex flex-col justify-center items-center w-full gap-6">
          <img src="/HLVS-logo.webp" className="max-w-[135px]" />
          <p className="text-2xl font-semibold">Inicia sesión</p>

          <LoginForm />

          <p className="text-base font-normal">
            ¿Todavía no tienes una cuenta?
            <Link
              className="text-base font-bold text-primary"
              to={PUBLIC_ROUTES.REGISTER}
            >
              {" "}
              Registrate
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
