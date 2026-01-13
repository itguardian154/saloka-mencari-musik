"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser({
  user = {
    name: "Antika Lorien",
    email: "antikalorien44@email.com",
    avatar: "",
  },
  onClickHandler,
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Avatar selalu tampil */}
              <Avatar className="h-11 w-11">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-muted p-1 overflow-hidden">
                  <img
                    src="/img/STK-20230906-WA0003.webp"
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </AvatarFallback>
              </Avatar>

              {/* Nama & email hanya tampil di desktop */}
              <div className="hidden md:grid flex-1 text-left text-sm leading-tight ml-3">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>

              {/* Chevron hanya tampil di desktop */}
              <ChevronsUpDown className="hidden md:block ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="bottom"
            align="end"
            sideOffset={8}
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          >
            <DropdownMenuItem onClick={onClickHandler}>
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
