import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../components/Layout";
import downloadsData from "../data/downloads_raw.json";

interface DownloadGroup {
  group: string;
  title: string;
  songs: Download[];
  zip?: string;
}
interface Download {
  title: string;
  path: string;
}
interface DownloadsProps {
  downloadGroups: DownloadGroup[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  DownloadsProps,
  Params
> = async ({}) => {
  return {
    props: {
      downloadGroups: downloadsData,
    },
  };
};

const downloadPrefix = "http://icecoldnugrape.com/media";
const DownloadsPage = ({ downloadGroups }: DownloadsProps) => {
  return (
    <Layout type="downloads">
      {downloadGroups.map(({ group, title, songs, zip }) => (
        <div key={group}>
          <h3>{title}</h3>
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
          <br />
        </div>
      ))}
    </Layout>
  );
};

export default DownloadsPage;
