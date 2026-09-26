import About from "@/components/about/About";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about South West Exposures, a firm specializing in the design and fabrication of disruptive shielding technology for innovative drug therapies.",
  alternates: {
    canonical: "/about"
  }
}

export default function AboutPage() {

  return (
    <About/>
  )
}
