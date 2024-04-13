"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  getRecordings,
  getSongs,
  getSongFromName,
  getRecordingComments,
  getSongComments,
} from "../../data";
import Fuse from "fuse.js";

const allRecordings = getRecordings().map(({ id, formattedTitle: text }) => ({
  href: `/recordings/${id}`,
  text,
}));
const allSongs = getSongs().map(({ sanitized, name }) => ({
  href: `/songs/${sanitized}`,
  text: name,
}));

const recordingComments = getRecordingComments().map(
  ({ id, type, comment: { text, name } }) => ({
    href: `/${type}/${id}`,
    text: `${name}: ${text}`,
  })
);

const songComments = getSongComments().map(
  ({ song, type, comment: { text, name } }) => ({
    href: `/${type}/${getSongFromName(song)!.sanitized}`,
    text: `${name}: ${text}`,
  })
);

const fuse = new Fuse(
  [...allRecordings, ...allSongs, ...recordingComments, ...songComments],
  {
    minMatchCharLength: 4,
    includeMatches: true,
    keys: [{ name: "text" }],
  }
);

interface Result {
  href: string;
  text: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fuse.FuseResult<Result>[]>([]);

  useEffect(() => {
    if (query === "") {
      setResults([]);
      return;
    }
    setResults(fuse.search<Result>(query));
  }, [query]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="Search for recordings, songs, or comments"
        size={40}
        value={query}
        onChange={({ target: { value } }) => {
          setQuery(value);
        }}
      />
      <ul className="hoverable">
        {results.map((result, index) => {
          const {
            item: { href },
          } = result;
          return (
            <li key={`${href}-${index}`}>
              <Link href={href}>
                <FuseHighlight result={result} attribute="text" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface FuseHighlightProps {
  result: Fuse.FuseResult<Result>;
  attribute: string;
}
const FuseHighlight = ({
  result: { matches = [] },
  attribute,
}: FuseHighlightProps) => {
  // Recursively builds JSX output adding `<mark>` tags around matches
  const highlight = (
    value: string,
    indices: readonly Fuse.RangeTuple[] = [],
    i = 1
  ): string | ReactNode => {
    const pair = indices[indices.length - i];
    return !pair ? (
      value
    ) : (
      <>
        {highlight(value.substring(0, pair[0]), indices, i + 1)}
        <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
        {value.substring(pair[1] + 1)}
      </>
    );
  };
  const { value, indices } = matches.find(({ key }) => key === attribute)!;
  return <>{highlight(value!, indices)}</>;
};
