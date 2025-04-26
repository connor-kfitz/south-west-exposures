"use client";

import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import BreadCrumbs from "./BreadCrumbs";

export default function TopNav() {

  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumbs();

  if (pathname.includes("admin")) {
    return null;
  }

  return (
    <nav className="w-full px-6">
      <div className="flex justify-start max-w-[556px] xl:max-w-[1160px] mx-auto">
        <BreadCrumbs breadCrumbs={breadcrumbs} />
      </div>
    </nav>
  )
}
