import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import { useCurrentUser } from "@/actions/use-current-user";
const Navbar = async () => {
  const currentUser = await useCurrentUser();
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes currentUser={currentUser} />
    </div>
  );
};

export default Navbar;
