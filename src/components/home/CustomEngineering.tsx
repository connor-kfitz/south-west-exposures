import Link from "next/link";

import { Button } from "../ui/button";

export default function CustomSolutions() {
  return (
    <section className="mb-[64px] sm:mb-[278px] px-6 sm:px-[48px] pb-0 sm:pb-[330px] md:pb-[173px]">
      <div className="max-w-[1160px] mx-auto rounded-[24px]">
        <div className="max-w-[565px]">
          <h2 className="text-h1 text-gray-900 font-semibold mb-6">Custom-engineered shielding for emerging therapies</h2>
          <p className="text-b5 text-gray-600 mb-6">
            SWE combines industry knowledge with innovative design to deliver practical shielding systems for drug development, distribution, and administration. As theranostics and RLT advance toward becoming the standard of care in oncology, we partner with teams to make these breakthroughs safe, reliable, and scalable.
          </p>
          <Link href="mailto:robert.kamen@swexposures.com" className="block w-full sm:w-auto"><Button variant="primary" size="primaryDefault" className="text-md font-medium pt-[13px] pb-[15px] w-full sm:w-auto">Explore custom solutions</Button></Link>
        </div>
      </div>
    </section>
  );
}
