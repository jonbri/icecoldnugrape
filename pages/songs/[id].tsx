import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../src/components/Layout";
import { getSongs, getSongFromSanitized, idsToShows } from "../../src/data";
import { Song, Recording } from "../../src/types";

interface PageProps {
  song: Song;
  shows: Recording[];
}
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<PageProps, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const song = getSongFromSanitized(id)!;
  const shows = idsToShows(song?.shows ?? []);
  return {
    props: {
      song,
      shows,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getSongs().map(({ sanitized: id }) => ({
    params: {
      id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Page: NextPage<PageProps> = ({ song: { name, comments }, shows }) => (
  <Layout type="songs">
    <h2>{name}</h2>
    <ul>
      {shows.map(({ linkid, formattedTitle }) => (
        <li key={linkid}>
          <Link href={`/recordings/${linkid}`}>{formattedTitle}</Link>
        </li>
      ))}
    </ul>
    {comments.length > 0 && (
      <div className="comments">
        <ul>
          {comments.map(({ name, text, time }) => (
            <li key={time}>
              <header>{`${name} (${time.split(" ")[0]})`}</header>
              {text}
            </li>
          ))}
        </ul>
      </div>
    )}
  </Layout>
);

export default Page;
