import Image from "next/image";

interface FaqsProps {
  className?: string;
}

export default function Faqs({ className }: FaqsProps) {
  return (
    <section className={className}>
      <div className="inline-block relative mb-4">
       <Image
          src="/images/contact/speech-bubble.svg"
          alt="Speech Bubble"
          width={97}
          height={73}
          className=""
        />
        <h2 className="text-violet-900 text-h4 leading-h4 absolute top-[12px] left-1/2 -translate-x-1/2 font-semibold text-center">FAQs</h2>
      </div>
      <ul className="flex flex-col gap-6 text-gray-600">
        <li>
          <h3 className="text-b6 leading-b6 font-semibold mb-1 text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h3>
          <p className="text-b6 leading-b6 text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula viverra, ullamcorper justo in, pellentesque augue.</p>
        </li>
        <li>
          <h3 className="text-b6 leading-b6 font-semibold mb-1 text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h3>
          <p className="text-b6 leading-b6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula viverra, ullamcorper justo in, pellentesque augue.</p>
        </li>
        <li>
          <h3 className="text-b6 leading-b6 font-semibold mb-1 text-gray-900">Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h3>
          <p className="text-b6 leading-b6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel ligula viverra, ullamcorper justo in, pellentesque augue.</p>
        </li>
      </ul>
    </section>
  )
}
