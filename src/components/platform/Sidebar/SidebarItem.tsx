import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { RoleEnum } from "@/models/user.model";
import { useAuth } from "@/stores/auth.store";

const variants = {
  open: { opacity: 1, transition: { duration: 0.6 } },
  closed: { opacity: 0, transition: { duration: 0.6 } },
};

interface SidebarItemProps {
  children?: React.ReactNode;
  label: string;
  to: string;
  isSidebarOpen?: boolean;
  allowedRoles?: RoleEnum[];
}

export const SidebarItem = ({
  label,
  children,
  to,
  isSidebarOpen,
  allowedRoles,
}: SidebarItemProps) => {
  const user = useAuth((state) => state.user);

  const pathname = useLocation().pathname;
  const isActive = pathname.includes(to);

  // Check if user has the required role to access the route
  if (
    allowedRoles &&
    !allowedRoles.some((role) => user?.roles.some((r) => r.name == role))
  ) {
    return null;
  }

  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-3 relative rounded-md flex gap-3 items-center w-full overflow-hidden",
        isActive && "bg-primary text-primary-foreground",
        !isActive && "hover:bg-muted"
      )}
    >
      {children}

      <motion.p
        className="absolute left-12 truncate"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={variants}
      >
        {label}
      </motion.p>
    </Link>
  );
};

export const SidebarItemLogout = ({
  label,
  children,
  isSidebarOpen,
}: Omit<SidebarItemProps, "to">) => {
  const logoutUser = useAuth((state) => state.logout);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 relative py-3 rounded-md flex gap-3 items-center hover:bg-muted overflow-hidden"
    >
      {children}
      <motion.p
        className={cn("absolute left-12 truncate")}
        animate={isSidebarOpen ? "open" : "closed"}
        variants={variants}
      >
        {label}
      </motion.p>
    </button>
  );
};
