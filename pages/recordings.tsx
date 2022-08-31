import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, Recording } from "../lib/data";
import Layout from "../components/Layout";
import type { NextPage } from "next";

interface Section {
  title: string;
  collection: Recording[];
}
interface RecordingsPageProps {
  sections: Section[];
}

const sectionsData = [
  { key: "Album", title: "Albums" },
  { key: "Single", title: "Singles" },
  { key: "Compilation", title: "Compilations" },
  { key: "Studio Bootleg", title: "Studio Bootlegs" },
  { key: "Show", title: "Shows" },
  { key: "Radio", title: "Radio" },
  { key: "TV", title: "TV" },
  { key: "Interview", title: "Interviews" },
];

const filterByType =
  (targetType: string) =>
  ({ type }: Recording) =>
    type === targetType;

interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  RecordingsPageProps,
  Params
> = async () => {
  const recordings = getRecordings();
  const sections = sectionsData.map(({ key, title }) => ({
    title,
    collection: recordings.filter(filterByType(key)),
  }));
  return {
    props: {
      sections,
    },
  };
};

const generateList = ({ title, collection }: Section) => (
  <section key={title}>
    <h2>{title}</h2>
    <ul>
      {collection.map(({ linkid, formattedTitle }) => (
        <li key={linkid}>
          <a href={`recordings/${linkid}`}>{formattedTitle}</a>
        </li>
      ))}
    </ul>
    <br />
  </section>
);

const RecordingsPage: NextPage<RecordingsPageProps> = ({ sections }) => (
  <Layout type="recordings">{sections.map(generateList)}</Layout>
);

export default RecordingsPage;
