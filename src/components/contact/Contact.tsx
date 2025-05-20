"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect } from "react";
import ContactForm from "./ContactForm";
import Faqs from "./Faqs";

export default function Contact() {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "Contact Us", link: "/contact" }
    ])
  }, [setBreadcrumbs]);

  return (
    <main className="font-main bg-gray-100 padding-content">
      <div className="pt-[48px] flex justify-center pb-[96px]">
        <div className="grid w-full max-w-[1160px] grid-cols-1 gap-y-12 lg:grid-cols-[minmax(0,0.57fr)_minmax(0,0.314fr)] lg:gap-x-[132px]">
          <ContactForm className="py-[64px]" />
          <Faqs className="pt-[64px]" />
        </div>
      </div>
    </main>
  )
}
