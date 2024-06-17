import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CreateDoctorOrAssistantForm from "./components/CreateDoctorOrAssistantForm/CreateDoctorOrAssistantForm";

function CreateDoctorOrAssistant() {
  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3 mb-4">
        <Link to={PRIVATE_ROUTES.MANAGE_DOCTORS_AND_ASSISTANTS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Crear usuario o asistente</h2>
      </div>

      <CreateDoctorOrAssistantForm />
    </PageContainer>
  );
}

export default CreateDoctorOrAssistant;
