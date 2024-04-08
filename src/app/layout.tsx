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
    trade: (
      <Link href="/trade" className={isTrade ? "active" : undefined}>
        Trade
      </Link>
    ),
    bandcamp: (
      <Link href="https://jonathanrichman.bandcamp.com/">Bandcamp</Link>
    ),
    tour: (
      <Link href="https://www.highroadtouring.com/artists/jonathan-richman/">
        Tour
      </Link>
    ),
    label: (
      <Link href="http://www.bluearrowrecords.com/record-label/jonathan-richman/">
        Label
      </Link>
    ),
    jojochords: <Link href="http://www.jojochords.com/index.html">Chords</Link>,
    jojoblog: <Link href="https://jojofiles.blogspot.com/">Blog</Link>,
    prev: (
      <Link
        href={`/recordings/${prev}`}
        aria-disabled={!prev}
        style={{
          opacity: prev ? 1 : 0.2,
          pointerEvents: prev ? "auto" : "none",
        }}
      >
        {`<`}
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
        {`>`}
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
          <div id="content">
            {isHome ? (
              <ul className="inline">
                <li>{links.bandcamp}</li>
                <li>{links.tour}</li>
                <li>{links.label}</li>
                <li>{links.jojochords}</li>
                <li>{links.jojoblog}</li>
              </ul>
            ) : null}
            {children}
            <br />
            {isHome ? (
              <ul>
                <li>{links.trade} </li>
                <li>
                  <Link href="https://github.com/jonbri/icecoldnugrape">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://web.archive.org/web/*/icecoldnugrape.com">
                    Since 2009
                  </Link>
                </li>
              </ul>
            ) : null}
            <br />
          </div>
        </div>
      </body>
    </html>
  );
}
