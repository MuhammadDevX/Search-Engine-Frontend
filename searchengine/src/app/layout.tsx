"use client";

import Link from "next/link";
import {  Search, PlusCircle } from "lucide-react";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  

  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground min-h-screen">
        <nav className="bg-background/80 backdrop-blur-sm fixed w-full z-10">
          <div className="container mx-auto flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <Search className="h-6 w-6 mr-2" />
              SearchDevX 
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/add-data"
                className="flex items-center hover:text-primary transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Data
              </Link>
              
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
