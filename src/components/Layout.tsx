import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { getRandomUrl } from "../data";
import { Ubuntu as Font } from "next/font/google";

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
    <div className={font.className}>
      <Head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/icecoldnugrape/favicon.ico" />
      </Head>
      <header>
        <h1>
          <Link href="/">ICECOLDNUGRAPE.COM</Link>
        </h1>
        <aside>
          <Link href="https://web.archive.org/web/*/icecoldnugrape.com">
            Since 2009
          </Link>
        </aside>
        <div className="links">
          <ul>
            <li>
              <a href="#">JojoBlog</a>
            </li>
            <li>
              <a href="#">Label</a>
            </li>
            <li>
              <a href="#">Tour</a>
            </li>
            <li>
              <a href="#">Bandcamp</a>
            </li>
            <li>
              <a href="#">JojoChords</a>
            </li>
            <li>
              <a href="#">Trade</a>
            </li>
          </ul>
          <ul>
            {siteLinks.map(({ href, text }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    type.toLowerCase() === text.toLowerCase()
                      ? "active"
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
      {children}
    </div>
  );
};

export default Layout;
