"use client";

import AboutHeader from "./AboutHeader";
import AboutImage from "./AboutImage";
import AboutFounder from "./AboutFounder";
import AboutGradient from "./AboutGradient";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";

export default function About() {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "About", link: "/about" }
    ])
  }, [setBreadcrumbs]);

  return (
    <main className="font-main padding-content relative overflow-hidden">
      <div className="pt-12 sm:pt-16 flex justify-center pb-[68px] sm:pb-[105px]">
        <div className="w-full max-w-[1160px]">
          <AboutHeader/>
          <div className="relative mt-8 sm:mt-16">
            <AboutGradient className="top-[36.72%]"/>
            <AboutImage/>
          </div>
          <AboutFounder className="relative mt-8 sm:mt-20"/>
        </div>
      </div>
    </main>
  );
}
