"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import SideNav from "@/components/nav/SideNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <SideNav/>
      {children}
    </SidebarProvider>
  )
}
