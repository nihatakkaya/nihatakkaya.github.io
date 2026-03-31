import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nihat | Software Developer",
  description:
    "Personal portfolio of Nihat — a passionate software developer building modern, responsive and high-performance web applications.",
  keywords: [
    "Nihat Akkaya",
    "Portfolio",
    "Software Developer",
    "Computer Engineer",
    "C#",
    ".NET",
    "Full Stack Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Nihat" }],
  openGraph: {
    title: "Nihat | Software Developer",
    description:
      "Personal portfolio of Nihat — building modern web applications with cutting-edge technologies.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-navy-900 text-gray-200 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
