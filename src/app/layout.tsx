import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import TopNav from "@/components/nav/TopNav";
import "./globals.css";
import Footer from "@/components/nav/Footer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
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
        <BreadcrumbProvider>
          <TopNav/>
          {children}
          <Footer/>
        </BreadcrumbProvider>
      </body>
    </html>
  )
}
