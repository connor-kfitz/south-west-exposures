"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import HeroHeader from "./HeroHeader";

export default function About() {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <>
      <HeroHeader />
      <div className="max-w-[1160px] padding-content mx-auto">

      </div>
    </>
  )
}
