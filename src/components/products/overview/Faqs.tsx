import { ProductFaq } from "@/types/admin-products";

interface FaqsProps {
  faqs: ProductFaq[];
  className?: string;
}

export default function Faqs({faqs, className}: FaqsProps) {
  return (
    <section className={className}>
      <h2 className="text-[32px] text-gray-900 font-semibold leading-[40px] mb-4">FAQs</h2>
      <ul className="flex flex-col gap-6 text-gray-600">
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3 className="font-semibold leading-[24px] mb-1 text-gray-900">{faq.question}</h3>
            <p className="leading-[24px]">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
