import Image from "next/image";
 
export default function Compliance() {
  return (
    <section className="w-full mb-[96px]">
      <div className="max-w-[1440px] mx-auto flex flex-col w-full lg:flex-row">
        <div className="flex flex-col justify-center items-center w-1/2 basis-1/2 px-6 min-h-[350px] lg:min-h-[479px] w-full">
          <div className="lg:max-w-[465px]">
            <h2 className="text-h1 text-gray-900 font-semibold mb-4">Regulatory compliance and oversight</h2>
            <p className="text-b6 text-gray-600">The SWE team has experience working with both the CNSC and NRC. SWE provides customizable solutions and package certification services that conform to IAEA, DOT and IATA regulations.</p>
          </div>
        </div>
        <div className="shrink basis-1/2 relative w-full lg:max-w-[720px] min-h-[300px] lg:min-h-[479px]">
          <Image
            src="/images/about/compliance.png"
            alt="Health Physics"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
