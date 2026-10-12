import Link from "next/link";
import Image from "next/image";

export default function ProductRange() {

  const productTypes = [
    {
      name: "Vial shields",
      imageSrc: "/images/home/vial-shields.png",
      path: "/products?shields=vial"
    },
    {
      name: "Lab & QA Products",
      imageSrc: "/images/home/lab-and-qa.png",
      path: "/products?shields=lab/qa"
    },
    {
      name: "Syringe shields",
      imageSrc: "/images/home/syringe-shields.png",
      path: "/products?shields=syringe"
    },
    {
      name: "Transport packaging",
      imageSrc: "/images/home/transport-packaging.png",
      path: "/products?usages=shipping"
    }
  ]

  return (
    <section className="mb-[64px] sm:mb-[96px] px-6 sm:px-[48px]">
      <div className="max-w-[1160px] mx-auto">
        <h2 className="text-h1 font-semibold text-gray-900 mb-8">Our product range</h2>
        <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {productTypes.map((product) => (
            <li key={product.path} className="group h-full">
              <Link href={product.path} className="block h-full rounded-[16px] focus-visible:ring-2 focus-visible:ring-blue-600
                focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:outline-none"
              >
                <div className="bg-[#F3F4F6] rounded-[16px] w-full h-full pt-5 flex flex-col items-center justify-end gap-1 pb-8">
                  <div className="w-full flex justify-center">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      className="object-contain"
                      width={266}
                      height={80}
                    />
                  </div>
                  <h3 className="text-b6 leading-b6 text-gray-900 text-center font-semibold">{product.name}</h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
