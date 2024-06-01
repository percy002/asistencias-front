'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarFB from "@/components/UI/NabvarFB";
import MyContext from "@/contexts/userContext";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "gerepro",
//   description: "registro de personal",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const [globalVariable, setGlobalVariable] = useState<string>('');

  return (
    <MyContext.Provider value={{ globalVariable, setGlobalVariable }}>
      <html lang="es" suppressHydrationWarning={true}>
        <body className={inter.className}>
          <NavbarFB />
          {children}
        </body>
      </html>
    </MyContext.Provider>
  );
}
