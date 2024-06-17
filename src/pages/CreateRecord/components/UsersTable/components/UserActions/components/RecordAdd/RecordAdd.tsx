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
import RecordAddForm from "./components/RecordAddForm";
import { UserFromAPI } from "@/models/user.model";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface RecordAddProps {
  user: UserFromAPI;
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecordAdd({
  user,
  isDialogOpen,
  setDialogOpen,
  setShowDropdown,
}: RecordAddProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        open={isDialogOpen}
        onOpenChange={(change) => {
          setDialogOpen(change);
          setShowDropdown(change);
        }}
      >
        <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
          <DropdownMenuItem className="cursor-pointer">
            <p>Agregar entrada</p>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar entrada al historial</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <RecordAddForm
            setOpen={setDialogOpen}
            setShowDropdown={setShowDropdown}
            user={user}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isDialogOpen}
      onOpenChange={(change) => {
        setDialogOpen(change);
        setShowDropdown(change);
      }}
    >
      <DrawerTrigger asChild onSelect={(e) => e.preventDefault()}>
        <DropdownMenuItem className="cursor-pointer">
          <p>Agregar entrada</p>
        </DropdownMenuItem>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Agregar entrada al historial</DrawerTitle>
          {/* <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription> */}
        </DrawerHeader>
        <RecordAddForm
          setOpen={setDialogOpen}
          setShowDropdown={setShowDropdown}
          className="px-4"
          user={user}
        />
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
