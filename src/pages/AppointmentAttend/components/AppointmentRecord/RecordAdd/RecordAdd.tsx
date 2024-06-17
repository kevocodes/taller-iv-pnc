import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Plus } from "lucide-react";
import { useState } from "react";
import RecordAddForm from "./components/RecordAddForm";
import { UserFromAPI } from "@/models/user.model";

interface RecordAddProps {
  user: UserFromAPI;
}

function RecordAdd({ user }: RecordAddProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full sm:w-fit">
            <Plus size={24} className="mr-2" />
            <p>Agregar</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar entrada al historial</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <RecordAddForm setOpen={setOpen} user={user}/>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full sm:w-fit">
          <Plus size={24} className="mr-2" />
          <p>Agregar</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Agregar entrada al historial</DrawerTitle>
          {/* <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription> */}
        </DrawerHeader>
        <RecordAddForm setOpen={setOpen} className="px-4" user={user}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default RecordAdd;
