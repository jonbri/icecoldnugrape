import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import { getSongs, Song } from "../lib/data";
import type { NextPage } from "next";

interface PageProps {
  songs: Song[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<PageProps, Params> = async () => {
  const songs = getSongs();
  return {
    props: {
      songs,
    },
  };
};

const Page: NextPage<PageProps> = ({ songs }) => (
  <Layout type="songs">
    <ul>
      {songs.map(({ linkid, value }) => (
        <li key={linkid}>
          <a href={`songs/${linkid}`}>{value}</a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Page;
