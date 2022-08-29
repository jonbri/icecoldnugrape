import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecording, getRecordings, Recording } from "../../lib/data";
import Layout from "../../components/Layout";

interface RecordingPageProps {
  recording: Recording;
}
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<
  RecordingPageProps,
  Params
> = async ({ params }) => {
  const { id } = params!;
  const recording = getRecording(id);
  return {
    props: {
      recording: recording!,
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

const RecordingPage: NextPage<RecordingPageProps> = ({ recording }) => {
  const { songs, formattedTitle, prev, next } = recording;
  const hasSubContent =
    recording.quality !== undefined || recording.comments.length > 0;
  const sortedSongs = songs?.sort(({ n: n0 }, { n: n1 }) => {
    if (n0 > n1) return 1;
    else if (n0 < n1) return -1;
    return 0;
  });
  return (
    <Layout type="recordings" prev={prev} next={next}>
      <h2>{formattedTitle}</h2>
      <ul>
        {sortedSongs?.map(({ linkid, value, n }) => (
          <li key={linkid}>
            <a href={`../songs/${linkid}`}>{`${n}. ${value}`}</a>
          </li>
        ))}
      </ul>

      {hasSubContent && (
        <div className="comments">
          {recording.quality && (
            <div>Best known quality: {recording.quality}</div>
          )}
          <ul>
            {recording.comments.map(({ name, text, time }) => (
              <li key={time}>
                <header>{name + " (" + time.split(" ")[0] + ")"}</header>
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default RecordingPage;
