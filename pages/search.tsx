import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getRecordings,
  getSongs,
  getComments,
  GoodRecording,
  GoodSong,
  GoodCommentInstance,
} from "../lib/recording";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

interface SearchProps {
  recordings: GoodRecording[];
  songs: GoodSong[];
  comments: GoodCommentInstance[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<SearchProps, Params> = async () => {
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
const SearchPage = ({ recordings, songs, comments }: SearchProps) => {
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
        text: recording.formattedTitle,
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
        text: song.value,
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
        text: `COMMENT: ${comment.comment.text}`,
      }));

    const matches = [...recordingMatches, ...songMatches, ...commentMatches];
    setMatches(matches);
  }, [query, recordings, songs, comments]);
  return (
    <Layout type="search">
      <input
        placeholder="Search for recordings or songs"
        size={30}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <ul>
        {matches.map(({ href, text }, index) => {
          return (
            <li key={`${href}${index}`}>
              <a href={href}>{text}</a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default SearchPage;
