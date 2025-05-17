import { ProductFaq } from "@/types/admin-products";

interface FaqsProps {
  faqs: ProductFaq[];
  className?: string;
}

export default function Faqs({faqs, className}: FaqsProps) {

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-h3 leading-h3 text-gray-900 font-semibold mb-4">FAQs</h2>
      <ul className="flex flex-col gap-6 text-gray-600">
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3 className="text-b6 leading-b6 font-semibold mb-1 text-gray-900">{faq.question}</h3>
            <p className="text-b6 leading-b6">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
