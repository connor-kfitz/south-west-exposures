interface FeaturesProps {
  className: string;
  features: string[];
}

export default function Features({features, className}: FeaturesProps) {
  return (
    <div className={className}>
      <h2 className="text-[32px] text-gray-900 font-semibold leading-[40px] mb-4">Features</h2>
      <ul className="flex flex-col gap-1 text-gray-600 list-disc ml-6 [&>li]:marker:text-sm [&>li]:marker:text-gray-600">
        {features.map((feature, index) => (
          <li className="leading-[24px]" key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}
