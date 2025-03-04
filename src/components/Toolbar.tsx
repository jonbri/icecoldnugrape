"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRecording } from "@/data";
import { RandomLink } from "@/components/RandomLink";

export const Toolbar = () => {
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
    random: <RandomLink />,
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

  return !isTrade ? (
    <ul className="inline">
      <li>{links.recordings}</li>
      <li>{links.songs}</li>
      <li>{links.random}</li>
      <li>{links.search}</li>
      {isHome ? <li>{links.listen}</li> : null}
      {showNextPrev ? (
        <>
          <li className="nextprev">{links.prev}</li>
          <li className="nextprev">{links.next}</li>
        </>
      ) : null}
    </ul>
  ) : null;
};
