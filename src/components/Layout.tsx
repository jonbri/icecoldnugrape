import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { getRandomUrl } from "../data";
import { Ubuntu as Font } from "next/font/google";
import cn from "../../styles/Layout.module.scss";

const font = Font({ subsets: ["latin"], weight: "300" });

interface SiteLink {
  href: string;
  text: string;
}
type PageType = "index" | "search" | "recordings" | "songs";
export interface LayoutProps {
  type: PageType;
  prev?: number | null;
  next?: number | null;
  children: ReactNode;
}
const Layout = ({ children, type, prev, next }: LayoutProps) => {
  const [siteLinks, setSiteLinks] = useState<SiteLink[]>([
    {
      href: "/recordings",
      text: "Recordings",
    },
    {
      href: "/songs",
      text: "Songs",
    },
    {
      href: "/search",
      text: "Search",
    },
    {
      href: "/",
      text: "Random",
    },
  ]);
  const showNextPrev = prev || next;

  useEffect(() => {
    const href = getRandomUrl();
    setSiteLinks((siteLinks) =>
      siteLinks.map((link) =>
        link.text === "Random"
          ? {
              href,
              text: "Random",
            }
          : link
      )
    );
  }, [children]);

  return (
    <div className={`${cn.root} ${font.className}`}>
      <Head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/icecoldnugrape/favicon.ico" />
      </Head>
      <header className={cn.header}>
        <div className={cn.h1Container}>
          <h1>
            <Link href="/" className={cn.title}>
              ICECOLDNUGRAPE.COM
            </Link>
          </h1>
          <aside>
            <a href="https://web.archive.org/web/*/icecoldnugrape.com">
              Since 2009
            </a>
          </aside>
        </div>
        <div>
          <ul>
            {siteLinks.map(({ href, text }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    type.toLowerCase() === text.toLowerCase()
                      ? cn.active
                      : undefined
                  }
                >
                  {text}
                </Link>
              </li>
            ))}
            {showNextPrev ? (
              <li>
                <Link
                  href={`/${type}/${prev}`}
                  aria-disabled={!prev}
                  className={cn.nextprev}
                  style={{
                    opacity: prev ? 1 : 0,
                    pointerEvents: prev ? "auto" : "none",
                  }}
                >
                  Prev
                </Link>
              </li>
            ) : null}
            {showNextPrev ? (
              <li>
                <Link
                  href={`/${type}/${next}`}
                  aria-disabled={!next}
                  className={cn.nextprev}
                  style={{
                    opacity: next ? 1 : 0,
                    pointerEvents: next ? "auto" : "none",
                  }}
                >
                  Next
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </header>
      <div className={cn.bodyContainer}>{children}</div>
    </div>
  );
};

export default Layout;
