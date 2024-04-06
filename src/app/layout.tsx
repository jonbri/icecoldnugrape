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
  const { prev, next } = getRecording(id) ?? {};
  const showNextPrev = prev || next;

  const links = {
    recordings: (
      <Link
        href="/recordings"
        className={pathname.startsWith("/recordings") ? "active" : undefined}
      >
        Recordings
      </Link>
    ),
    songs: (
      <Link
        href="/songs"
        className={pathname.startsWith("/songs") ? "active" : undefined}
      >
        Songs
      </Link>
    ),
    random: <Link href={getRandomUrl()}>Random</Link>,
    search: (
      <Link
        href="/search"
        className={pathname.startsWith("/search") ? "active" : undefined}
      >
        Search
      </Link>
    ),
    listen: (
      <Link
        href="/listen"
        className={pathname.startsWith("/listen") ? "active" : undefined}
      >
        Listen
      </Link>
    ),
    trade: (
      <Link
        href="/trade"
        className={pathname.startsWith("/trade") ? "active" : undefined}
      >
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

  const isHome = pathname === "/";
  const isRecordings = pathname === "/recordings";
  const isSongs = pathname === "/songs";
  const isTrade = pathname === "/trade";

  return (
    <html lang="en">
      <head>
        <title>icecoldnugrape</title>
        <meta name="og:title" content="icecoldnugrape" />
        <meta name="description" content="icecoldnugrape" />
        <link rel="icon" href="/icecoldnugrape/favicon.ico" />
      </head>
      <body className={font.className}>
        <header>
          <h1>
            <Link href="/">
              {!isHome ? <span>&#8593;</span> : null}icecoldnugrape.com
            </Link>
          </h1>
          <div
            className="links"
            style={{
              display: isHome || isRecordings || isSongs ? "flex" : "inherit",
              flexDirection:
                isHome || isRecordings || isSongs ? "column" : "inherit",
            }}
          >
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
            {isHome ? (
              <ul className="inline">
                <li>{links.bandcamp}</li>
                <li>{links.tour}</li>
                <li>{links.label}</li>
                <li>{links.jojochords}</li>
                <li>{links.jojoblog}</li>
              </ul>
            ) : null}
          </div>
        </header>
        {children}
        <br />
        {pathname === "/" ? (
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
      </body>
    </html>
  );
}
