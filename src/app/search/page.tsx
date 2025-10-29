"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse, { FuseResult, RangeTuple } from "fuse.js";
import {
  getRecordings,
  getSongs,
  getSongFromName,
  getRecordingComments,
  getSongComments,
} from "@/data";

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
  }),
);

const songComments = getSongComments().map(
  ({ song, type, comment: { text, name } }) => ({
    href: `/${type}/${getSongFromName(song)!.sanitized}`,
    text: `${name}: ${text}`,
  }),
);

const fuse = new Fuse(
  [...allRecordings, ...allSongs, ...recordingComments, ...songComments],
  {
    minMatchCharLength: 4,
    includeMatches: true,
    keys: [{ name: "text" }],
  },
);

interface Result {
  href: string;
  text: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<Result>[]>([]);

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
    <div className="search-container">
      <div className="search-input-container">
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Search for recordings, songs, or comments"
          value={query}
          onChange={({ target: { value } }) => {
            setQuery(value);
          }}
        />
      </div>
      {query && results.length === 0 && (
        <div className="no-results">
          No results found for &ldquo;{query}&rdquo;
        </div>
      )}
      {results.length > 0 && (
        <>
          <div className="search-count">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </div>
          <ul className="search-results">
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
        </>
      )}
    </div>
  );
}

interface FuseHighlightProps {
  result: FuseResult<Result>;
  attribute: string;
}
const FuseHighlight = ({
  result: { matches = [] },
  attribute,
}: FuseHighlightProps) => {
  // Recursively builds JSX output adding `<mark>` tags around matches
  const highlight = (
    value: string,
    indices: readonly RangeTuple[] = [],
    i = 1,
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
