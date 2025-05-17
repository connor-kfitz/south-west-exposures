import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink } from "../ui/breadcrumb";
import { Breadcrumb as BreadCrumbType } from "../../types/global";
import Image from "next/image";

interface BreadCrumbsProps {
  breadCrumbs: BreadCrumbType[];
}

export default function BreadCrumbs({ breadCrumbs }: BreadCrumbsProps) {
  return (
    <Breadcrumb className="pt-4">
      <BreadcrumbList className="flex items-center leading-[20px]">
        {breadCrumbs.map((crumb, index) => {
          const isLast = index === breadCrumbs.length - 1;

          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem 
                className="text-b7 leading-b7 text-gray-600"
              >
                {isLast ? (
                  <span className="p-0.5">{crumb.name}</span>
                ) : (
                  <BreadcrumbLink 
                    href={crumb.link}
                      className="inline-block underline underline-offset-3 p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >  
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <div className="flex justify-center items-center w-[16px] h-[16px] mx-[3px]">
                  <Image
                    src="/images/top-nav/right-chevron.svg"
                    alt="Right Chevron"
                    width={6}
                    height={8}
                  />
                </div>
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
