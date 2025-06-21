import Link from "next/link";
import { Button } from "../ui/button";

export default function CustomSolutions() {
  return (
    <section className="mb-[48px] px-[24px] sm:px-[48px]">
      <div className="flex xl:block justify-center items-center xl-block rounded-[24px] max-w-[1344px] min-h-[560px] md:min-h-[871px] mx-auto xl:pt-[217px] bg-custom-solutions xl:pr-[141px]">
        <div className="xl:ml-auto max-w-[465px] px-[48px] xl:px-0">
          <h2 className="text-d2 text-gray-900 font-bold mb-4">Custom solutions for your drug therapies</h2>
          <p className="text-b6 text-gray-600 mb-6">SWE combines industry knowledge with innovative engineering and designs to provide practical solutions in support of Drug Development, Distribution and Administration. Theranostics and RLT continue to evolve towards Standard of Care in Oncology. SWE is a trusted industry partner for these new and emerging technologies.</p>
          <Link href="mailto:robert.kamen@swexposures.com"><Button variant="primary" size="primaryDefault" className="text-md font-medium">Custome your solution</Button></Link>
        </div>
      </div>
    </section>
  )
}
