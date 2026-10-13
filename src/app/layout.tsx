import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ProviderComponent from "@/components/providerComponet/provider-Componet";

const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description: "FreshCart - your online grocery store",
};

// Renders the global HTML document structure, providing global providers, navigation, and footer.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", ibmPlexSans.variable)}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ProviderComponent>
          {children}
        </ProviderComponent>

      </body>
    </html>
  );
}