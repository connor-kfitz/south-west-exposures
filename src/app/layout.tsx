import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import { GoogleAnalytics } from "@next/third-parties/google";
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

export const metadata = {
  title: "South West Exposures",
  description: "Solutions for innovative drug therapies. South West Exposures is a firm specializing in the design and fabrication of disruptive shielding technology.",
  alternates: {
    canonical: process.env.DOMAIN_NAME
  }
}

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
      {process.env.NODE_ENV === "production" ? <GoogleAnalytics gaId="G-V4002057Y5"/> : null}
    </html>
  )
}
