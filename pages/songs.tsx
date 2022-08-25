import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import { getSongs, Song } from "../lib/data";
import type { NextPage } from "next";

interface SongsPageProps {
  songs: Song[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  SongsPageProps,
  Params
> = async ({}) => {
  const songs = getSongs();
  return {
    props: {
      songs: songs!,
      foo: "",
    },
  };
};

const SongsPage: NextPage<SongsPageProps> = ({ songs }) => {
  return (
    <Layout type="songs">
      <ul>
        {songs.map((song) => {
          const { linkid, value } = song;
          return (
            <li key={linkid}>
              <a href={`songs/${linkid}`}>{value}</a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default SongsPage;
