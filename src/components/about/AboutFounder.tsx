import AboutLinkedInLink from "./AboutLinkedInLink";
import AboutPortrait from "./AboutPortrait";

import { linkedInLinks } from "@/lib/constants";

export default function AboutFounder({ className = "" }: { className?: string }) {

  return (
    <section className={`grid grid-cols-1 sm:grid-cols-[31.38%_57.16%] sm:items-start sm:justify-between sm:gap-x-6 sm:gap-y-16 ${className}`}>
      <AboutPortrait className="order-2 max-sm:mb-6 sm:order-none sm:col-start-1 sm:row-start-1 sm:row-span-2"/>
      <div className="order-1 flex flex-col gap-6 min-w-0 max-sm:mb-16 sm:order-none sm:col-start-2 sm:row-start-1">
        <h2 className="text-h3 font-semibold text-gray-900">
          Built on decades of experience in radiation safety and nuclear medicine
        </h2>
        <div className="flex flex-col gap-6 text-b6 text-gray-600">
          <p>
            South West Exposures (SWE) was founded by a small team of experts in radiopharmacy, radiation safety,
            nuclear medicine technology, and radiochemistry - with more than 50 years of combined experience in the
            radiopharmaceutical field.
          </p>
          <p>
            After years of research, collaboration, and hands-on experience, the team developed South West Shielding,
            a breakthrough line of customizable shielding solutions for Theranostics, Nuclear Medicine, and Molecular
            Imaging.
          </p>
          <p>
            These innovative designs go beyond traditional shielding by improving ergonomics, radiation safety, and
            efficiency, while also reducing weight, size, and transportation costs. The result: better safety, better
            workflow, and a stronger return on investment.
          </p>
        </div>
        <AboutLinkedInLink href={linkedInLinks.company}>Follow SWE on LinkedIn</AboutLinkedInLink>
      </div>
      <div className="order-3 flex flex-col gap-6 min-w-0 sm:order-none sm:col-start-2 sm:row-start-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-b5 font-semibold text-gray-900">
            Robert Kamen, MRT(N)
            <br/>
            Founder &amp; Chief Executive Officer
          </h3>
          <p className="text-b6 text-gray-600">
            Robert has more than 20 years of clinical, academic, and administrative experience in Nuclear Medicine
            Technology, Radiation Safety, and Business Administration. He holds a B.A. in Economics and has served on
            multiple advisory boards with the Canadian Association of Medical Radiation Technologists (CAMRT) and the
            College of Physicians and Surgeons of Ontario (CPSO). Robert also worked as a Radiation Safety Specialist
            on the Emergency Decontamination Unit at the University Health Network (UHN).
          </p>
        </div>
        <AboutLinkedInLink href={linkedInLinks.founder}>View Robert&rsquo;s LinkedIn profile</AboutLinkedInLink>
      </div>
    </section>
  );
}
