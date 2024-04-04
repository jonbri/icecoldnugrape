import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecording, getRecordings } from "../../lib/data";
import { Recording, SongInstance } from "../../lib/types";
import Layout from "../../components/Layout";

interface PageProps {
  recording: Recording;
}
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<PageProps, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const recording = getRecording(id)!;
  return {
    props: {
      recording,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getRecordings().map(({ linkid: id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

const Page: NextPage<PageProps> = ({
  recording: { songs, formattedTitle, quality, comments, jon, prev, next },
}) => {
  const sortedSongs =
    songs?.sort(({ n: n0 }, { n: n1 }) => {
      if (n0 > n1) return 1;
      else if (n0 < n1) return -1;
      return 0;
    }) ?? [];

  const set1 = sortedSongs.filter(({ set }) => set === 1);
  const set2 = sortedSongs.filter(({ set }) => set === 2);
  const set3 = sortedSongs.filter(({ set }) => set === 3);

  const hasSets = set2?.length > 0;
  const generateSetList = (set: SongInstance[]) => (
    <ul>
      {set.map(({ name, sanitized, n }) => (
        <li key={`${n}-${sanitized}`}>
          <Link href={`/songs/${sanitized}`}>{`${n}. ${name}`}</Link>
        </li>
      ))}
    </ul>
  );
  const generateSet = (set: SongInstance[]) =>
    set.length > 0 ? (
      <>
        <h3>Set {set[0].set}</h3>
        {generateSetList(set)}
      </>
    ) : null;

  return (
    <Layout type="recordings" prev={prev} next={next}>
      <h2>{formattedTitle}</h2>
      {jon === true ? (
        <div className="available">
          This recording is{" "}
          <Link href="/myCollection">available for trade or just ask me</Link>
        </div>
      ) : null}

      {hasSets ? (
        <>
          {generateSet(set1)}
          {generateSet(set2)}
          {generateSet(set3)}
        </>
      ) : (
        generateSetList(sortedSongs)
      )}

      {quality !== undefined || comments.length > 0 ? (
        <div className="comments">
          {quality && <div>Best known quality: {quality}</div>}
          <ul>
            {comments.map(({ name, text, time }) => (
              <li key={time}>
                <header>{`${name} (${time.split(" ")[0]})`}</header>
                {text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Layout>
  );
};

export default Page;
