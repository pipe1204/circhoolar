import NavLinks from "./NavLinks";
import { Icons } from "../Icons";

export default function SideNav() {
  const navbarHeight = "64px"; //Height of the navbar
  return (
    <div
      className="flex h-full flex-col bg-light-white px-3 py-4 xl:px-2 shadow-lg overflow-y-auto"
      style={{ height: `calc(100vh - ${navbarHeight})` }}
    >
      <div className="flex flex-col space-y-2">
        <NavLinks />
      </div>
      <div className="mt-auto">
        <button className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-light-white p-3 text-sm text-dark-purple font-medium hover:bg-lightest-purple hover:text-dark-purple md:flex-none md:justify-start md:p-2 md:px-3">
          <Icons.logout />
          <span className="hidden xl:block">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
