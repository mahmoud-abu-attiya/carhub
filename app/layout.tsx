import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Find, book, rent a car—quick and super easy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="telative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
