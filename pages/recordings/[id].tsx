// import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  getRecording,
  getRecordings,
  GoodRecording,
} from "../../lib/recording";
import Layout from "../../components/Layout";

interface RecordingProps {
  recording: GoodRecording;
}
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<RecordingProps, Params> = async ({
  params,
}) => {
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

const RecordingPage = ({ recording }: RecordingProps) => {
  const { songs, formattedTitle, prev, next } = recording;
  const hasSubContent =
    recording.quality !== undefined || recording.comments.length > 0;
  return (
    <Layout type="recordings" prev={prev} next={next}>
      <h3>{formattedTitle}</h3>
      <ul>
        {songs?.map(({ linkid, value, n }) => (
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
