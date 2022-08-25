import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, GoodRecording } from "../lib/recording";
import Layout from "../components/Layout";
import type { NextPage } from "next";

interface RecordingsPageProps {
  recordings: GoodRecording[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  RecordingsPageProps,
  Params
> = async ({}) => {
  const recordings = getRecordings();
  return {
    props: {
      recordings,
    },
  };
};

const RecordingsPage: NextPage<RecordingsPageProps> = ({ recordings }) => {
  return (
    <Layout type="recordings">
      <ul>
        {recordings.map((recording) => {
          const { linkid, formattedTitle } = recording;
          return (
            <li key={linkid}>
              <a href={`recordings/${linkid}`}>
                {} {formattedTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default RecordingsPage;
