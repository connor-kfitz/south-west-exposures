import Link from "next/link";
import Image from "next/image";

export default function ProductRange() {

  const productTypes = [
    {
      name: "Vial shields",
      imageSrc: "/images/about/syringe-shields.png",
      path: "/products?shields=vial"
    },
    {
      name: "Lab & QA Products",
      imageSrc: "/images/about/lab-and-qa.png",
      path: "/products?shields=lab/qa"
    },
    {
      name: "Syringe shields",
      imageSrc: "/images/about/syringe-shields-two.png",
      path: "/products?shields=syringe"
    },
    {
      name: "Transport packaging",
      imageSrc: "/images/about/transport-packaging.png",
      path: "/products?usages=shipping"
    }
  ]

  return (
    <section className="mb-[64px] px-[48px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="text-d3 font-semibold text-gray-900 mb-[24px]">Our product range</h2>
        <ul className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {productTypes.map((product, index) => (
            <li key={index} className="mb-4 group">
              <Link href={product.path} className="block">
                <Image 
                  src={product.imageSrc}
                  alt={product.name}
                  className="w-full md:w-[266px] transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
                  width={266}
                  height={64}
                />
                <h3 className="text-b6 leading-b6 text-gray-900 text-center font-semibold">{product.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
