import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  page: string;
}

export default function Header({ page }: HeaderProps) {
  return (
    <header className="flex pb-5 shrink-0 items-center gap-2 md:px-3">
      <SidebarTrigger className="text-[#eeeeec]"/>
      <Breadcrumb>
        <BreadcrumbList className='gap-2.5'>
          <BreadcrumbItem className="hidden md:block">
            Admin
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{page}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
