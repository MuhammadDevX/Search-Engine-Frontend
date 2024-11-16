"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <html lang="en" className={theme}>
      <body className="bg-background text-foreground min-h-screen">
        <nav className="bg-background/80 backdrop-blur-sm fixed w-full z-10">
          <div className="container mx-auto flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <Search className="h-6 w-6 mr-2" />
              SearchX 
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/add-data"
                className="flex items-center hover:text-primary transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Data
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
