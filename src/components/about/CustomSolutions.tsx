import Link from "next/link";

import { Button } from "../ui/button";

export default function CustomSolutions() {
  return (
    <section className="mb-[278px] px-[24px] sm:px-[48px] pb-[173px]">
      <div className="max-w-[1344px] mx-auto rounded-[24px]">
        <div className="ml-[92px] max-w-[565px]">
          <h2 className="text-h1 text-gray-900 font-semibold mb-6">Custom-engineered shielding for emerging therapies</h2>
          <p className="text-b5 text-gray-600 mb-6">
            SWE combines industry knowledge with innovative design to deliver practical shielding systems for drug development, distribution, and administration. As theranostics and RLT advance toward becoming the standard of care in oncology, we partner with teams to make these breakthroughs safe, reliable, and scalable.
          </p>
          <Link href="mailto:robert.kamen@swexposures.com"><Button variant="primary" size="primaryDefault" className="text-md font-medium pt-[13px] pb-[15px]">Explore custom solutions</Button></Link>
        </div>
      </div>
    </section>
  );
}
