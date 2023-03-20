import type { NextPage } from "next";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecording, getRecordings, Recording } from "../../lib/data";
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
  recording: { songs, formattedTitle, quality, comments, prev, next },
}) => {
  const sortedSongs = songs?.sort(({ n: n0 }, { n: n1 }) => {
    if (n0 > n1) return 1;
    else if (n0 < n1) return -1;
    return 0;
  });
  return (
    <Layout type="recordings" prev={prev} next={next}>
      <h2>{formattedTitle}</h2>
      <div className="available">
        This recording is <Link href="/myCollection">available for trade</Link>
      </div>
      <ul>
        {sortedSongs?.map(({ linkid, value, n }) => (
          <li key={linkid}>
            <a href={`../songs/${linkid}`}>{`${n}. ${value}`}</a>
          </li>
        ))}
      </ul>

      {quality !== undefined ||
        (comments.length > 0 && (
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
        ))}
    </Layout>
  );
};

export default Page;
