import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import sections from "../data/downloads_raw.json";
import type { NextPage } from "next";

interface Download {
  title: string;
  path: string;
}
interface Section {
  group: string;
  title: string;
  songs: Download[];
  zip?: string;
}
interface PageProps {
  sections: Section[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<PageProps, Params> = async () => ({
  props: {
    sections,
  },
});

const downloadPrefix = "http://icecoldnugrape.com/media";
const generateList = ({ group, title, songs, zip }: Section) => (
  <section key={group}>
    <h2>{title}</h2>
    {zip && (
      <a href={`${downloadPrefix}/${group}/${zip}`}>
        <em>Download All</em>
      </a>
    )}
    <ul>
      {songs.map(({ path, title }) => (
        <li key={path}>
          <a href={`${downloadPrefix}/${group}/${path}`}>{title}</a>
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
    (acc, { songs: { length } }) => acc + length,
    0
  );
  return (
    <Layout type="listen">
      {sections.map(generateList)}
      {`Total downloads: ${total}`}
    </Layout>
  );
};

export default Page;
