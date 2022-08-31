import { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getRecordings,
  getSongs,
  getComments,
  Recording,
  Song,
  CommentInstance,
} from "../lib/data";
import Layout from "../components/Layout";

interface SearchPageProps {
  recordings: Recording[];
  songs: Song[];
  comments: CommentInstance[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  SearchPageProps,
  Params
> = async () => {
  const recordings = getRecordings();
  const songs = getSongs();
  const comments = getComments();
  return {
    props: {
      recordings,
      songs,
      comments,
    },
  };
};

interface Match {
  href: string;
  text: string;
}
const SearchPage: NextPage<SearchPageProps> = ({
  recordings,
  songs,
  comments,
}) => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  useEffect(() => {
    if (query === "") {
      setMatches([]);
      return;
    }
    const recordingMatches = recordings
      .filter(({ formattedTitle }) =>
        formattedTitle.toLowerCase().includes(query.toLowerCase())
      )
      .map(({ linkid, formattedTitle }) => ({
        href: `/recordings/${linkid}`,
        text: formattedTitle.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        ),
      }));

    const songMatches = songs
      .filter(({ value }) => value.toLowerCase().includes(query.toLowerCase()))
      .map(({ linkid, value }) => ({
        href: `/songs/${linkid}`,
        text: value.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        ),
      }));

    const commentMatches = comments
      .filter(({ comment: { text } }) =>
        text.toLowerCase().includes(query.toLowerCase())
      )
      .map(({ linkid, type, comment: { text } }) => ({
        href: `/${type}/${linkid}`,
        text: `COMMENT: ${text.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        )}`,
      }));

    setMatches([...recordingMatches, ...songMatches, ...commentMatches]);
  }, [query, recordings, songs, comments]);

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
        {matches.map(({ href, text }, index) => (
          <li key={`${href}${index}`}>
            <a href={href} dangerouslySetInnerHTML={{ __html: text }}></a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default SearchPage;
