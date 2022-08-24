import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import { getSongs } from "../lib/recording";
import { SongImport } from "../lib/types";
// import type { NextPage } from "next";

interface SongsProps {
  songs: SongImport[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  SongsProps,
  Params
> = async ({}) => {
  const songs = getSongs();
  return {
    props: {
      songs: songs!,
    },
  };
};

const SongsPage = ({ songs }: SongsProps) => {
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
