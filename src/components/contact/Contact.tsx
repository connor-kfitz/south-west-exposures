"use client";

import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
// import Faqs from "./Faqs";
import ConfirmationDialog from "../shared/ConfirmationDialog";
import { ConfirmationAlert } from "@/types/global";

export default function Contact() {

  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      { name: "Home", link: "/" },
      { name: "Contact Us", link: "/contact" }
    ])
  }, [setBreadcrumbs]);

  const [alertDialog, setAlertDialog] = useState<ConfirmationAlert>({ title: "Message sent ", description: "Thank you for contacting us. We typically respond within 1 to 2 business days.", open: false });

  return (
    <main className="font-main bg-gray-100 padding-content">
      <div className="pt-[48px] flex justify-center pb-[64px] sm:pb-[96px]">
        {/* <div className="grid justify-between w-full max-w-[1160px] grid-cols-1 sm:gap-y-12 lg:grid-cols-[minmax(0,0.5716fr)_minmax(0,0.3147fr)]"> */}
        <div className="">
          <ContactForm className="py-6 sm:py-[64px]" setAlertDialog={setAlertDialog}/>
          {/* <Faqs className="pt-[64px]"/> */}
          <ConfirmationDialog alertDialog={alertDialog} setAlertDialog={setAlertDialog}/>
        </div>
      </div>
    </main>
  )
}
