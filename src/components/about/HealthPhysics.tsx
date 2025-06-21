import Image from "next/image";

export default function HealthPhysics() {
  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto flex flex-col-reverse w-full lg:flex-row">
        <div className="shrink basis-1/2 relative w-full lg:max-w-[720px] min-h-[300px] lg:min-h-[479px]">
          <Image
            src="/images/about/health-physics.png"
            alt="Health Physics"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 basis-1/2 px-6 min-h-[350px] lg:min-h-[479px] w-full">
          <div className="lg:max-w-[464px]">
            <h2 className="text-h1 text-gray-900 font-semibold mb-4">Health physics</h2>
            <p className="text-b6 text-gray-600">SWE Health Physicists work with state of the art Monte Carlo Modelling software. This allows SWE to efficiently and effectively produce shielding solutions that meet and exceed industry requirements. SWE provides HP guidance in support of your shielding and shipping decisions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
