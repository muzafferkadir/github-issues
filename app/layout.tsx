import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Github Issues",
  description: "Github Issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container-outer">
          {children}
        </div>
      </body>
    </html>
  );
}
