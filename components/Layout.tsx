import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { getRandomUrl } from "../lib/recording";
import cn from "../styles/Layout.module.scss";

export interface LayoutProps {
  type: "index" | "search" | "downloads" | "recordings" | "songs";
  prev?: number | null;
  next?: number | null;
  children: ReactNode;
}
const Layout = ({ children, type, prev, next }: LayoutProps) => {
  const siteLinks = [
    {
      href: "/downloads",
      text: "Downloads",
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
      href: getRandomUrl(),
      text: "Random",
    },
  ];
  return (
    <div className={cn.root}>
      <Head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={cn.header}>
        <div>
          <Link href="/">
            <a className={cn.title}>ICECOLDNUGRAPE.COM</a>
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
                <Link href={href}>
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
                <Link href={`/${type}/${prev}`}>
                  <a className={cn.nextprev}>Previous</a>
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link href={`/${type}/${next}`}>
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
