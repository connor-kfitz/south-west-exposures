interface FeaturesProps {
  features: string[];
}

export default function Features({features}: FeaturesProps) {
  return (
    <div className="max-w-[663px]">
      <h2 className="text-[32px] text-gray-900 font-semibold leading-[48px] mb-4">Features</h2>
      <ul className="flex flex-col gap-1 text-gray-600 list-disc ml-6 [&>li]:marker:text-sm [&>li]:marker:text-gray-600">
        {features.map((feature, index) => (
          <li className="leading-[24px]" key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )
}
