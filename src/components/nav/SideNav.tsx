"use client";

import { SideNavLink } from "@/types/side-nav";
import { usePathname } from 'next/navigation';
import { 
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, 
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function SideNav() {

  const pathname = usePathname();
  if (!pathname.includes("admin")) return;

  const mainlinks: SideNavLink[] = [
    {
      name: "Products",
      href: "/admin/products",
      image: {
        path: "/images/side-nav/box.svg",
        alt: "Box",
        size: 20
      }
    },
    {
      name: "Articles",
      href: "/admin/articles",
      image: {
        path: "/images/side-nav/news-paper.svg",
        alt: "News Paper",
        size: 18
      }
    },
    {
      name: "Messages",
      href: "/admin/messages",
      image: {
        path: "/images/side-nav/mail.svg",
        alt: "Mail",
        size: 18
      }
    }
  ];

  return (
    <Sidebar className="font-[Inter] border-none">
      <SidebarContent>
        <Header/>
        <Main links={mainlinks} pathname={pathname}/>
        <Footer/>
      </SidebarContent>
    </Sidebar>
  )
}

function Header() {
  return (
    <SidebarHeader className="flex-row items-center p-4">
      <div className="flex justify-center items-center bg-[#1D4ED8] w-[40px] h-[40px] rounded-[8px]">
        <Image 
          src="/images/side-nav/blocks.svg"
          alt="blocks"
          width={32}
          height={32}
          />
      </div>
      <div>
        <h1 className="text">South West Exposures</h1>
        <h2 className="text-sm">Admin</h2>
      </div>
    </SidebarHeader>
  )
}

interface MainProps {
  links: SideNavLink[];
  pathname: string;
}

function Main({ links, pathname }: MainProps) {

  function isActiveLink(link: string): boolean {
    return pathname === link;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Interface</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {links.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link className={isActiveLink(item.href) ? "bg-[#27272A]" : ""} href={item.href}>
                  <Image 
                    src={item.image.path} 
                    alt={item.image.alt}
                    width={item.image.size}
                    height={item.image.size}
                  />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function Footer() {
  return (
    <SidebarFooter className="flex-row items-center p-4 mt-auto">
        <Image
          src="/images/side-nav/rob.png"
          alt="blocks"
          className="flex justify-center items-center bg-[#FED3BC] rounded-[8px]"
          width={40}
          height={40}
          onClick={() => signOut({ callbackUrl: "/auth" })}
        />
      <div>
        <h1 className="text">Robert Kamen</h1>
        <h2 className="text-sm">Owner</h2>
      </div>
    </SidebarFooter>
  )
}
