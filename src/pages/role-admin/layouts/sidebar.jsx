import { mediaLogo } from "@/assets/image/logo"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useLogout } from "@/hooks/useLogout"
import { Home, LogOut, User } from "lucide-react"
import { Link } from "react-router-dom"

// contoh dummy data
const menuItems = [
  { title: "Dashboard", icon: Home, url: "/admin/dashboard" },
  { title: "Peserta", icon: User, url: "/admin/daftar-peserta" },
]

export function AppSidebar() {
  const logout = useLogout()

  return (
    <Sidebar variant="inset">
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link>
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-white">
                  <img
                    src={mediaLogo[0]}
                    alt="Logo Saloka"
                    className="w-full flex-shrink-0"
                  />
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-semibold whitespace-nowrap">Saloka Mencari Musik</p>
                  <p className="text-xs text-muted-foreground">
                    Saloka Theme Park
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MENU */}
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* LOGOUT */}
      <SidebarMenuItem>
        <SidebarMenuButton onClick={logout}>
          <LogOut className="mr-2 h-4 w-4 text-red-600" />
          <span className="text-red-600">Keluar</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span className="text-sm text-muted-foreground">
                © 2026 Saloka Mencari Musik
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
