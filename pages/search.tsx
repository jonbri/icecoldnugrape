import { ReactNode, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { getRecordings, getSongs, getComments } from "../lib/data";
import Layout from "../components/Layout";
import Fuse from "fuse.js";

const allRecordings = getRecordings().map(
  ({ linkid, formattedTitle: text }) => ({
    href: `/recordings/${linkid}`,
    text,
  })
);
const allSongs = getSongs().map(({ linkid, value: text }) => ({
  href: `/songs/${linkid}`,
  text,
}));
const allComments = getComments().map(
  ({ linkid, type, comment: { text } }) => ({
    href: `/${type}/${linkid}`,
    text: `COMMENT: ${text}`,
  })
);

const fuse = new Fuse([...allRecordings, ...allSongs, ...allComments], {
  minMatchCharLength: 4,
  includeMatches: true,
  keys: [{ name: "text" }],
});

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
            <li key={`${href}${index}`}>
              <a href={href}>
                <FuseHighlight result={result} attribute="text" />
              </a>
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
