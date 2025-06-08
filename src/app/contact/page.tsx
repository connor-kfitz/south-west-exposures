import Contact from "@/components/contact/Contact";
import { notFound } from "next/navigation";

export default function ContactPage() {
  notFound();
  return (
    <Contact/>
  )
}
