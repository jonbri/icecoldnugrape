import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getRecordings,
  getSongs,
  GoodRecording,
  GoodSong,
} from "../lib/recording";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";

interface SearchProps {
  recordings: GoodRecording[];
  songs: GoodSong[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<SearchProps, Params> = async () => {
  const recordings = getRecordings();
  const songs = getSongs();
  return {
    props: {
      recordings,
      songs,
    },
  };
};

interface Match {
  href: string;
  text: string;
}
const SearchPage = ({ recordings, songs }: SearchProps) => {
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
    setMatches(recordingMatches.concat(songMatches));
  }, [query, recordings, songs]);
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
            <li key={`${href}index`}>
              <a href={href}>{text}</a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default SearchPage;
