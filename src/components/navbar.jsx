import { Outlet, useNavigate } from "react-router-dom"
import { mediaLogo } from "@/assets/image/logo"
import { NavUser } from "./nav-user"
import { SidebarProvider } from "./ui/sidebar"
import { LogOut, MessageCircle } from "lucide-react"
import axios from "axios"
import API_URLS from "../../config"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useLogout } from "@/hooks/useLogout"

const Navbar = () => {
  const [detailUser, setDetailUser] = useState({
    token: localStorage.getItem("token"),
  });

  useEffect(() => {
    setDetailUser({
      token: localStorage.getItem("token"),
    });
  }, []);

  const logout = useLogout()

  const adminWhatsapp =
    "https://wa.me/6287838890777?text=Halo%20Admin,%20saya%20butuh%20bantuan."

  const navigate = useNavigate()


  return (
    <SidebarProvider>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="h-20 flex items-center justify-between px-4">
          <img src={mediaLogo[0]} className="h-16 shrink-0" />

          <div className="flex items-center gap-3">

            {/* HUBUNGI ADMIN */}
            <a
              href={adminWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                border border-emerald-500 text-emerald-600
                hover:bg-emerald-500 hover:text-white
                transition-all duration-200
                text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Hubungi Admin
            </a>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500
                text-red-600 hover:text-white
                hover:bg-red-600
                transition-all duration-200
                font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>

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
