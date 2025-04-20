// app/layout.tsx
import "./globals.scss";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Toaster } from "sonner"; // Optional toast library

export const metadata = {
  title: "Habit Tracker",
  description: "Build better habits with AI-powered tracking.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster richColors position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
