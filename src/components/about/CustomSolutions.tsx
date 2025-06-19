import { Button } from "../ui/button";

export default function CustomSolutions() {
  return (
    <section className="mb-[48px]">
      <div className="rounded-[24px] max-w-[1344px] min-h-[871px] mx-auto pt-[217px] pr-[141px] bg-custom-solutions">
        <div className="ml-auto max-w-[465px]">
          <h2 className="text-d2 text-gray-900 font-bold mb-4">Custom solutions for your drug therapies</h2>
          <p className="text-b6 text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          <Button variant="primary" size="primaryDefault" className="text-md font-medium">Custome your solution</Button>
        </div>
      </div>
    </section>
  )
}
