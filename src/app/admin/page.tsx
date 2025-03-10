"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") router.push("/admin/products")
  }, [pathname, router]);

  return null;
};

export default AdminPage;
