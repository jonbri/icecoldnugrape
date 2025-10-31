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
    prev: prev ? (
      <Link href={`/recordings/${prev}`}>Prev</Link>
    ) : (
      <span
        style={{ opacity: 0.2, cursor: "not-allowed" }}
        aria-disabled="true"
        role="button"
        tabIndex={-1}
      >
        Prev
      </span>
    ),
    next: next ? (
      <Link href={`/recordings/${next}`}>Next</Link>
    ) : (
      <span
        style={{ opacity: 0.2, cursor: "not-allowed" }}
        aria-disabled="true"
        role="button"
        tabIndex={-1}
      >
        Next
      </span>
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
