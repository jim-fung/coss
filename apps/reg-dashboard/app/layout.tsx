import { fontMono, fontSans } from "@coss/ui/fonts";
import { ThemeProvider } from "@coss/ui/shared/theme-provider";
import type { Metadata } from "next";
import type * as React from "react";
import "./globals.css";

export const metadata: Metadata = {
  description:
    "Internal Flow Workbench for the REG registration pilot — operate, investigate, evaluate.",
  title: "REG Flow Workbench",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} relative bg-sidebar font-sans text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
