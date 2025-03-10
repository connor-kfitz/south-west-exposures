import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import SideNav from "@/components/nav/SideNav";

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Theme appearance="dark" accentColor="violet">
          <SidebarProvider>
            <SideNav />
            {children}
          </SidebarProvider>
        </Theme>
      </body>
    </html>
  );
}
