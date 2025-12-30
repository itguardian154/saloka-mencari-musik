import { Outlet } from "react-router-dom"
import { mediaLogo } from "@/assets/image/logo"
import { NavUser } from "./nav-user"
import { SidebarProvider } from "./ui/sidebar"

const Navbar = () => {
  return (
    <SidebarProvider>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="h-20 flex items-center justify-between px-4">
          <img src={mediaLogo[0]} className="h-12 shrink-0" />
          <div className="flex items-center shrink-0">
            <NavUser />
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="pt-20 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Navbar
