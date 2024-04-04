import { GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import { getSongs } from "../lib/data";
import { Song } from "../lib/types";
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

const Page: NextPage<PageProps> = ({ songs }) => {
  return (
    <Layout type="songs">
      <ul>
        {songs.map(({ linkid, value }) => (
          <li key={linkid}>
            <Link href={`/songs/${linkid}`}>{value}</Link>
          </li>
        ))}
      </ul>
      {`Total songs: ${songs.length}`}
    </Layout>
  );
};

export default Page;
