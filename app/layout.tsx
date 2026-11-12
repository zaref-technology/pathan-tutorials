import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Public pages override this in app/(public)/layout.tsx using the admin SEO settings.
export const metadata: Metadata = {
  title: "Pathan Tutorials of Mathematics",
  description:
    "Mathematics coaching in Hinganghat for Classes 8th to 12th (CBSE and Maharashtra State Board) and MH-CET.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-dark text-white">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#111111",
                color: "#ffffff",
                border: "1px solid #2a2a2a",
                fontSize: "0.875rem",
              },
              success: {
                iconTheme: { primary: "#eab308", secondary: "#000" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
