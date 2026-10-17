"use client";

import Link from "next/link";
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";
import MobileNav from "./MobileNav";
import InquiryListSheet from "./inquiry/InquiryListSheet";
import ProductsMegaMenu from "./ProductsMegaMenu";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useBreadcrumbs } from "@/contexts/BreadcrumbContext";
import { navLinks } from "@/lib/constants";

export default function TopNav() {

  const pathname = usePathname();
  const { breadcrumbs } = useBreadcrumbs();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTriggerRef = useRef<HTMLSpanElement>(null);
  const megaMenuToggleRef = useRef<HTMLButtonElement>(null);
  const megaMenuPanelRef = useRef<HTMLDivElement>(null);
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMegaMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!megaMenuOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (!isInsideMegaMenu(e.target as Node)) setMegaMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [megaMenuOpen]);

  useEffect(() => {
    return () => clearMegaMenuCloseTimer();
  }, []);

  if (pathname.includes("admin") || pathname.includes("auth")) {
    return null;
  }

  function isActiveLink(link: string) {
    return pathname === link || pathname.startsWith(link + "/");
  }

  function isInsideMegaMenu(node: Node | null) {
    if (!node) return false;
    return !!(megaMenuTriggerRef.current?.contains(node) || megaMenuPanelRef.current?.contains(node));
  }

  function clearMegaMenuCloseTimer() {
    if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
  }

  function handleMegaMenuPointerEnter(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearMegaMenuCloseTimer();
    setMegaMenuOpen(true);
  }

  function handleMegaMenuPointerLeave(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    clearMegaMenuCloseTimer();
    megaMenuCloseTimer.current = setTimeout(() => setMegaMenuOpen(false), 150);
  }

  function handleMegaMenuBlur(e: React.FocusEvent) {
    if (!isInsideMegaMenu(e.relatedTarget as Node | null)) setMegaMenuOpen(false);
  }

  function handleMegaMenuKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Escape" || !megaMenuOpen) return;
    setMegaMenuOpen(false);
    megaMenuToggleRef.current?.focus();
  }

  function getBreadcrumbBackgroundColor() {
    if (pathname.includes("/contact")) return "bg-gray-100";
    return "bg-white";
  }

  return (
    <nav className="w-full font-main">
      <div className="relative padding-content" style={{ boxShadow: 'var(--shadow-nav)' }}>
        <div className="flex items-center min-h-[88px] max-w-[1160px] py-3 mx-auto">
          <Link href="/" className="shrink-0 block mr-[32px] relative bottom-[6px] rounded-[4px] focus-visible:ring-offset-2
            focus-visible:ring-offset-white focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <Image
              src="/images/top-nav/swe-logo.png"
              alt="South West Exposures"
              className="block"
              height={47}
              width={72}
            />
            <span className="sr-only">South West Exposures</span>
          </Link>
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <InquiryListSheet/>
            <MobileNav navLinks={navLinks} isActiveLink={isActiveLink}/>
          </div>
          <div className="hidden md:flex flex-wrap justify-between items-center w-full gap-y-2">
            <ul className="flex flex-wrap gap-[32px] text-gray-900 text-b6 leading-b6 mt-[4px] mr-[32px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.megaMenu ? (
                    <>
                      <span
                        ref={megaMenuTriggerRef}
                        className="relative inline-flex items-center"
                        onPointerEnter={handleMegaMenuPointerEnter}
                        onPointerLeave={handleMegaMenuPointerLeave}
                        onBlur={handleMegaMenuBlur}
                        onKeyDown={handleMegaMenuKeyDown}
                      >
                        <Link className={`whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800
                          focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white
                          focus-visible:outline-none ${isActiveLink(link.href) ? " underline underline-offset-3" : ""}`}
                          href={link.href}
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <button
                          ref={megaMenuToggleRef}
                          type="button"
                          aria-expanded={megaMenuOpen}
                          aria-controls="products-mega-menu"
                          aria-label={`Show ${link.name.toLowerCase()} categories`}
                          className="absolute left-full ml-1 flex items-center justify-center size-5 rounded-[4px] cursor-pointer opacity-0
                            focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                          onClick={() => setMegaMenuOpen(open => !open)}
                        >
                          <Image
                            src="/images/products/list/up-chevron.svg"
                            alt=""
                            width={12}
                            height={6}
                            className={megaMenuOpen ? "" : "rotate-180"}
                          />
                        </button>
                      </span>
                      {megaMenuOpen && (
                        <Suspense>
                          <ProductsMegaMenu
                            id="products-mega-menu"
                            panelRef={megaMenuPanelRef}
                            onPointerEnter={handleMegaMenuPointerEnter}
                            onPointerLeave={handleMegaMenuPointerLeave}
                            onBlur={handleMegaMenuBlur}
                            onKeyDown={handleMegaMenuKeyDown}
                            onSelect={() => setMegaMenuOpen(false)}
                          />
                        </Suspense>
                      )}
                    </>
                  ) : (
                    <Link className={`whitespace-nowrap p-0.5 hover:text-blue-800 rounded-[4px] focus-visible:text-blue-800
                      focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 focus-visible:ring-2 focus-visible:ring-white
                      focus-visible:outline-none ${isActiveLink(link.href) ? " underline underline-offset-3" : ""}`}
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex items-center gap-[32px] relative top-[2px]">
              <li>
                <InquiryListSheet/>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {breadcrumbs.length ? <div className={`hidden padding-content rounded md:block ${getBreadcrumbBackgroundColor()}`}>
        <div className="max-w-[1160px] mx-auto">
          <BreadCrumbs breadCrumbs={breadcrumbs}/>
        </div>
      </div> : null}
    </nav>
  );
}
