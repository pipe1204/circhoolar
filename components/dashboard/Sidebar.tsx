import NavLinks from "./NavLinks";
import { Icons } from "../Icons";

export default function SideNav() {
  const navbarHeight = "56px"; //Height of the navbar
  return (
    <div
      className="hidden xl:flex w-full h-full flex-col bg-light-white px-3 py-4 xl:px-2 shadow-lg overflow-y-auto"
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <div className="flex flex-col space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
