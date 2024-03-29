import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { getRandomUrl } from "../lib/data";
import cn from "../styles/Layout.module.scss";

interface SiteLink {
  href: string;
  text: string;
}
type PageType = "index" | "search" | "listen" | "recordings" | "songs";
export interface LayoutProps {
  type: PageType;
  prev?: number | null;
  next?: number | null;
  children: ReactNode;
}
const Layout = ({ children, type, prev, next }: LayoutProps) => {
  const [siteLinks, setSiteLinks] = useState<SiteLink[]>([
    {
      href: "/listen",
      text: "Listen",
    },
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
    <div className={cn.root}>
      <Head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={cn.header}>
        <div className={cn.h1Container}>
          <Link href="/" legacyBehavior>
            <h1>
              <a className={cn.title}>ICECOLDNUGRAPE.COM</a>
            </h1>
          </Link>
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
                <Link href={href} legacyBehavior>
                  <a
                    className={
                      type.toLowerCase() === text.toLowerCase()
                        ? cn.active
                        : undefined
                    }
                  >
                    {text}
                  </a>
                </Link>
              </li>
            ))}
            {prev && (
              <li>
                <Link href={`/${type}/${prev}`} legacyBehavior>
                  <a className={cn.nextprev}>Prev</a>
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link href={`/${type}/${next}`} legacyBehavior>
                  <a className={cn.nextprev}>Next</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
      <div className={cn.bodyContainer}>{children}</div>
    </div>
  );
};

export default Layout;
