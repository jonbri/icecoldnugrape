import { ReactNode, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import {
  getRecordings,
  getSongs,
  getSongFromName,
  getRecordingComments,
  getSongComments,
} from "../lib/data";
import Layout from "../components/Layout";
import Fuse from "fuse.js";
import Link from "next/link";

const allRecordings = getRecordings().map(
  ({ linkid, formattedTitle: text }) => ({
    href: `/recordings/${linkid}`,
    text,
  })
);
const allSongs = getSongs().map(({ sanitized, value: text }) => ({
  href: `/songs/${sanitized}`,
  text,
}));

const recordingComments = getRecordingComments().map(
  ({ linkid, type, comment: { text, name } }) => ({
    href: `/${type}/${linkid}`,
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

const SearchPage: NextPage = ({}) => {
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
    <Layout type="search">
      <input
        ref={inputRef}
        placeholder="Search for recordings, songs, or comments"
        size={40}
        value={query}
        onChange={({ target: { value } }) => {
          setQuery(value);
        }}
      />
      <ul>
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
    </Layout>
  );
};

interface FuseHighlightProps {
  result: Fuse.FuseResult<Result>;
  attribute: string;
}
const FuseHighlight = ({ result, attribute }: FuseHighlightProps) => {
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
  const { value, indices } = result.matches?.find(
    ({ key }) => key === attribute
  )!;
  return <>{highlight(value!, indices)}</>;
};

export default SearchPage;
