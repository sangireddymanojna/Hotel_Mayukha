import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Mayukha | Fine Dining, Aqua & Jungle Theme Restaurant | Hyderabad",
  description: "Experience authentic culinary excellence at Hotel Mayukha in KPHB & Kokapet, Hyderabad. Featuring Aqua and Jungle theme dining, luxurious banquet halls, and outdoor catering services.",
  keywords: ["Hotel Mayukha", "Restaurant Hyderabad", "KPHB Biryani", "Jungle Theme Restaurant", "Aqua Theme Restaurant", "Banquet Halls KPHB", "Hyderabad Catering"],
  authors: [{ name: "Manojna Sangireddy" }],
  openGraph: {
    title: "Hotel Mayukha | Fine Dining & Banquet Halls",
    description: "Authentic Hyderabad biryanis, tandoor starters, theme dining, and state-of-the-art banquet halls.",
    url: "https://hotelmayukha.com",
    siteName: "Hotel Mayukha",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-mayukha-dark text-mayukha-cream antialiased selection:bg-mayukha-gold selection:text-mayukha-dark relative overflow-x-hidden">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
