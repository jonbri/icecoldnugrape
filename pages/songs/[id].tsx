import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Layout from "../../components/Layout";
import { getSongs, getSong, idsToShows, Song, Recording } from "../../lib/data";

interface SongPageProps {
  song: Song;
  shows: Recording[];
}
interface Params extends ParsedUrlQuery {
  id: string;
}
export const getStaticProps: GetStaticProps<SongPageProps, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const song = getSong(Number(id));
  const shows = idsToShows(song?.shows ?? []);
  return {
    props: {
      song: song!,
      shows,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = getSongs().map(({ linkid: id }) => ({
    params: {
      id: id + "",
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

const SongPage: NextPage<SongPageProps> = ({ song, shows }) => {
  const hasSubContent = song.comments.length > 0;
  return (
    <Layout type="songs">
      <h2>{song.value}</h2>
      <ul>
        {shows.map(({ linkid, formattedTitle }) => (
          <li key={linkid}>
            <a href={`../recordings/${linkid}`}>{formattedTitle}</a>
          </li>
        ))}
      </ul>
      {hasSubContent && (
        <div className="comments">
          <ul>
            {song.comments.map(({ name, text, time }) => (
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

export default SongPage;
