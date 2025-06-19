import Link from "next/link";
import Image from "next/image";

export default function ProductRange() {

  const productTypes = [
    {
      name: "Syringe shields",
      imageSrc: "/images/about/syringe-shields.png",
      path: "/products?shields=syringes"
    },
    {
      name: "Lab & QA Products",
      imageSrc: "/images/about/lab-and-qa.png",
      path: "/products?shields=syringes"
    },
    {
      name: "Syringe shields",
      imageSrc: "/images/about/syringe-shields-two.png",
      path: "/products?shields=syringes"
    },
    {
      name: "Transport packaging",
      imageSrc: "/images/about/transport-packaging.png",
      path: "/products?shields=syringes"
    }
  ]

  return (
    <section className="mb-[64px]">
      <h2 className="text-d3 font-semibold text-gray-900 mb-[24px]">Our product range</h2>
      <ul className="flex justify-center gap-[32px]">
        {productTypes.map((product, index) => (
          <li key={index} className="flex items-center mb-4 group">
            <Link href={product.path} className="block">
              <Image 
                src={product.imageSrc}
                alt={product.name}
                className="w-[266px] transition-transform duration-500 ease-in-out group-hover:scale-[1.05]"
                width={266}
                height={64}
              />
              <h3 className="text-b6 leading-b6 text-gray-900 text-center font-semibold">{product.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
