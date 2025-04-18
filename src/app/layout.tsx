import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideNav from "@/components/nav/SideNav";
import "./globals.css";

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jakarta.variable} antialiased`}
      >
        <SidebarProvider>
          <SideNav/>
          {children}
        </SidebarProvider>
      </body>
    </html>
  )
}
