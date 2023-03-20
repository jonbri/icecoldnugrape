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
  return (
    <div className="myCollection">
      <Link href="/" className="back">
        Back
      </Link>
      <br />
      <h1>My Collection</h1>
      <ul>
        {recordings
          .filter(({ jon }) => jon === true)
          .map(({ linkid, formattedTitle }) => (
            <li key={linkid}>
              <a href={`recordings/${linkid}`}>{formattedTitle}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyCollectionPage;
