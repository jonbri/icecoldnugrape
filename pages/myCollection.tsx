import { GetStaticProps } from "next";
import Link from "next/link";
import type { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, Recording } from "../lib/data";
import { Ubuntu as Font } from "next/font/google";
import cn from "../styles/Layout.module.scss";

const font = Font({ subsets: ["latin"], weight: "300" });

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
    <div className={`${cn.myCollection} ${font.className}`}>
      <Link href="/" className="back">
        Back
      </Link>
      <br />
      <h1>My Collection</h1>
      <ul>
        {all.map(({ linkid, type, formattedTitle }) => {
          let doubleFormattedTitle = formattedTitle;
          if (type !== "Show" && type !== "Radio") {
            doubleFormattedTitle = `${type}: ${formattedTitle}`;
          }
          return (
            <li key={linkid}>
              <Link href={`/recordings/${linkid}`}>{doubleFormattedTitle}</Link>
            </li>
          );
        })}
      </ul>
      Total: {totalCount}
      <br />
      <br />
      <div className="available">Contact: icecoldnugrape@yahoo.com</div>
    </div>
  );
};

export default MyCollectionPage;
