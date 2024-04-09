"use client"; // needed for usePathname

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRandomUrl, getRecording } from "../data";
import { Ubuntu as Font } from "next/font/google";
import "../global.scss";

const font = Font({ subsets: ["latin"], weight: "300" });

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const id = pathname.split("/").reverse()[0];
  const isHome = pathname === "/";
  const isTrade = pathname === "/trade";
  const isRecordings = pathname.startsWith("/recordings");
  const isSongs = pathname.startsWith("/songs");
  const isSearch = pathname.startsWith("/search");
  const isListen = pathname.startsWith("/listen");
  const { prev, next } = getRecording(id) ?? {};
  const showNextPrev = prev || next;

  const links = {
    recordings: (
      <Link href="/recordings" className={isRecordings ? "active" : undefined}>
        Recordings
      </Link>
    ),
    songs: (
      <Link href="/songs" className={isSongs ? "active" : undefined}>
        Songs
      </Link>
    ),
    random: <Link href={getRandomUrl()}>Random</Link>,
    search: (
      <Link href="/search" className={isSearch ? "active" : undefined}>
        Search
      </Link>
    ),
    listen: (
      <Link href="/listen" className={isListen ? "active" : undefined}>
        Listen
      </Link>
    ),
    prev: (
      <Link
        href={`/recordings/${prev}`}
        aria-disabled={!prev}
        style={{
          opacity: prev ? 1 : 0.2,
          pointerEvents: prev ? "auto" : "none",
        }}
      >
        Prev
      </Link>
    ),
    next: (
      <Link
        href={`/recordings/${next}`}
        aria-disabled={!next}
        style={{
          opacity: next ? 1 : 0.2,
          pointerEvents: next ? "auto" : "none",
        }}
      >
        Next
      </Link>
    ),
  };

  return (
    <html lang="en">
      <head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/icecoldnugrape/favicon.ico" />
      </head>
      <body className={font.className}>
        <div id="container">
          <header>
            <div id="header-content">
              <h1>
                <Link href="/">
                  {!isHome ? <span>&#8593;</span> : null}icecoldnugrape.com
                </Link>
              </h1>
              {!isTrade ? (
                <ul className="inline">
                  <li>{links.recordings}</li>
                  <li>{links.songs}</li>
                  <li>{links.random}</li>
                  <li>{links.search}</li>
                  {isHome ? <li>{links.listen}</li> : null}
                  {showNextPrev ? (
                    <>
                      <li>{links.prev}</li>
                      <li>{links.next}</li>
                    </>
                  ) : null}
                </ul>
              ) : null}
            </div>
          </header>
          <div id="content">{children}</div>
        </div>
      </body>
    </html>
  );
}
