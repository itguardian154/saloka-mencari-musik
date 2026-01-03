import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/pages/role-admin/layouts/sidebar"
import { useLocation } from "react-router-dom"

const getBreadcrumbLabel = (pathname) => {
  if (pathname.includes("/dashboard")) return "Dashboard"
  if (pathname.includes("/daftar-peserta")) return "Peserta"
  return "Dashboard"
}


export default function Layout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4">
          <SidebarTrigger />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {getBreadcrumbLabel(location.pathname)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="px-4 pt-2 pb-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}




// export default function Layout() {
//   return (
//     <SidebarProvider>
//       <AppSidebar />

//       <SidebarInset>
//         <header className="flex h-14 items-center gap-2 px-4">
//           <SidebarTrigger />
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="#">Peserta</BreadcrumbLink>
//               </BreadcrumbItem>
//               {/* <BreadcrumbSeparator /> */}
//               {/* <BreadcrumbItem>
//                 <BreadcrumbPage>Daftar</BreadcrumbPage>
//               </BreadcrumbItem> */}
//             </BreadcrumbList>
//           </Breadcrumb>
//         </header>

//         <main className="px-4 pt-0.5 pb-4">
//           <Outlet /> {/* ⬅️ INI PENTING */}
//         </main>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }
