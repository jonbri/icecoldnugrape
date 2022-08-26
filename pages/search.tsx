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
      .filter((recording) => {
        const titleMatch = recording.formattedTitle
          .toLowerCase()
          .includes(query.toLowerCase());
        return titleMatch;
      })
      .map((recording) => ({
        href: `/recordings/${recording.linkid}`,
        text: recording.formattedTitle.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        ),
      }));

    const songMatches = songs
      .filter((song) => {
        const titleMatch = song.value
          .toLowerCase()
          .includes(query.toLowerCase());
        return titleMatch;
      })
      .map((song) => ({
        href: `/songs/${song.linkid}`,
        text: song.value.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        ),
      }));

    const commentMatches = comments
      .filter((comment) => {
        const titleMatch = comment.comment.text
          .toLowerCase()
          .includes(query.toLowerCase());
        return titleMatch;
      })
      .map((comment) => ({
        href: `/${comment.type}/${comment.linkid}`,
        text: `COMMENT: ${comment.comment.text.replace(
          new RegExp(`(${query})`, "i"),
          '<span style="color:gold">$1</span>'
        )}`,
      }));

    const matches = [...recordingMatches, ...songMatches, ...commentMatches];
    setMatches(matches);
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
        onChange={({ target }) => {
          setQuery(target.value);
        }}
      />
      <ul>
        {matches.map(({ href, text }, index) => {
          return (
            <li key={`${href}${index}`}>
              <a href={href} dangerouslySetInnerHTML={{ __html: text }}></a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default SearchPage;
