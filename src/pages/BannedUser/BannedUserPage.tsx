import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { useTitle } from "@/hooks/useTitle";
import { UserX } from "lucide-react";

function BannedUserPage() {
  useTitle("Usuario bloqueado");

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <UserX size={240} className="text-muted-foreground" />
        <p className="text-xl text-muted-foreground font-bold text-center">Tu cuenta ha sido bloqueada</p>
        <p className="text-md text-muted-foreground text-center">Si crees que se trata de un error contacta con soporte</p>
      </div>
    </PageContainer>
  );
}

export default BannedUserPage;
