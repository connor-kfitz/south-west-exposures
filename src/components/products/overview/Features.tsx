interface FeaturesProps {
  className: string;
  features: string[];
}

export default function Features({features, className}: FeaturesProps) {

  if (!features || features.length === 0) return null;

  return (
    <section className={className}>
      <h2 className="text-h3 leading-h3 text-gray-900 font-semibold mb-4">Features</h2>
      <ul className="flex flex-col gap-1 text-gray-600 list-disc ml-6 [&>li]:marker:text-sm [&>li]:marker:text-gray-600">
        {features.map((feature, index) => (
          <li className="text-b6 leading-b6" key={index}>{feature}</li>
        ))}
      </ul>
    </section>
  )
}
