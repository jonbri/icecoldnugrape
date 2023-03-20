import { GetStaticProps } from "next";
import Link from "next/link";
import type { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, Recording } from "../lib/data";

interface MyCollectionPageProps {
  recordings: Recording[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  MyCollectionPageProps,
  Params
> = async () => {
  const recordings = getRecordings();
  return {
    props: {
      recordings,
    },
  };
};

const MyCollectionPage: NextPage<MyCollectionPageProps> = ({ recordings }) => {
  const all = recordings
    .filter(({ type }) => type !== "Album")
    .filter(({ jon }) => jon);
  const totalCount = all.length;
  return (
    <div className="myCollection">
      <Link href="/" className="back">
        Back
      </Link>
      <br />
      <h1>My Collection</h1>
      <ul>
        {all.map(({ linkid, type, formattedTitle }) => {
          let doubleFormattedTitle = formattedTitle;
          if (type !== "Show") {
            doubleFormattedTitle = `${type}: ${formattedTitle}`;
          }
          return (
            <li key={linkid}>
              <a href={`recordings/${linkid}`}>{doubleFormattedTitle}</a>
            </li>
          );
        })}
      </ul>
      <br />
      Total: {totalCount}
    </div>
  );
};

export default MyCollectionPage;
