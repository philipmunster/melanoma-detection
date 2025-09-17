import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Melanoma discovery app",
  description: "Discover Melanoma using our advanced algorithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
