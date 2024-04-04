import { GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Layout from "../src/components/Layout";
import { getSongs } from "../src/data";
import { Song } from "../src/types";
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
        {songs.map(({ name, sanitized }) => (
          <li key={sanitized}>
            <Link href={`/songs/${sanitized}`}>{name}</Link>
          </li>
        ))}
      </ul>
      {`Total songs: ${songs.length}`}
    </Layout>
  );
};

export default Page;
