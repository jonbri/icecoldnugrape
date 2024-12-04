import { ReactNode } from "react";
import { Ubuntu as Font } from "next/font/google";
import { Header } from "@/components/Header";
import "@/global.scss";

const font = Font({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>icecoldnugrape.com</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/icecoldnugrape/favicon.ico" />
      </head>
      <body className={font.className}>
        <div id="container">
          <Header />
          <div id="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
