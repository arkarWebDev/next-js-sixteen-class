import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Forum | Next.js Developer Community",
  description:
    "A full-stack developer forum built with Next.js, Prisma, Better Auth, and Stripe premium subscriptions.",
  keywords: [
    "Next.js",
    "Prisma",
    "Stripe",
    "Forum",
    "Class Project",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className=" max-w-4xl mx-auto px-8 lg:px-0">
            <Toaster position="bottom-right" richColors />
            <Header />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
