import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ResponseError } from "@/models/ResponseError.model";
import { UserFromAPI } from "@/models/user.model";
import { deleteUser } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUsers } from "@/stores/users.store";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteDoctorOrAssitantProps {
  user: UserFromAPI;
}

function DeleteDoctorOrAssitant({ user }: DeleteDoctorOrAssitantProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const token = useAuth((state) => state.token);
  const removerUserfromUI = useUsers((state) => state.removeUser);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteUser(user.idUser, token!);
      toast.success(response);
      removerUserfromUI(user.idUser);
      setOpen(false);
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
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"destructive"}>
            <Trash2 size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Eliminar usuario</DialogTitle>
            <DialogDescription>
              Esta acción no puede ser revertida. ¿Estás seguro de que deseas
              eliminar este usuario?
            </DialogDescription>
          </DialogHeader>
          {/* <RecordAddForm setOpen={setOpen} user={user} /> */}
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading && (
              <LoaderCircle size={16} className="animate-spin mr-2" />
            )}
            Eliminar
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" size={"icon"}>
          <Trash2 size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Eliminar usuario</DrawerTitle>
          <DrawerDescription>
            Esta acción no puede ser revertida. ¿Estás seguro de que deseas
            eliminar este usuario?
          </DrawerDescription>
        </DrawerHeader>
        {/* <RecordAddForm setOpen={setOpen} className="px-4" user={user} /> */}

        <Button variant="destructive" disabled={loading} onClick={handleDelete}>
          {loading && <LoaderCircle size={16} className="animate-spin mr-2" />}
          Eliminar
        </Button>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DeleteDoctorOrAssitant;
