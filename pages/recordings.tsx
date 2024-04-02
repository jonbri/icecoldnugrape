import { GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, Recording } from "../lib/data";
import Layout from "../components/Layout";
import type { NextPage } from "next";

interface Section {
  title: string;
  collection: Recording[];
}
interface PageProps {
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
export const getStaticProps: GetStaticProps<PageProps, Params> = async () => {
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
    <h2>{`${title} (${collection.length})`}</h2>
    <ul>
      {collection.map(({ linkid, formattedTitle }) => (
        <li key={linkid}>
          <Link href={`recordings/${linkid}`}>{formattedTitle}</Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      h2 {
        font-weight: normal;
      }
      section {
        margin-bottom: 10px;
      }
    `}</style>
  </section>
);

const Page: NextPage<PageProps> = ({ sections }) => {
  const total = sections.reduce(
    (acc, { collection: { length } }) => acc + length,
    0
  );
  return (
    <Layout type="recordings">
      {sections.map(generateList)}
      {`Total recordings: ${total}`}
    </Layout>
  );
};

export default Page;
