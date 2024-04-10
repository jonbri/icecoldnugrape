import Comments from "../../../components/Comments";
import { getSongFromSanitized, getSongs, idsToShows } from "../../../data";
import Link from "next/link";

export async function generateStaticParams() {
  const paths = getSongs().map(({ sanitized: id }) => ({
    params: {
      id,
    },
  }));
  return paths.map((path) => ({
    slug: path.params.id,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const song = getSongFromSanitized(id)!;
  const shows = idsToShows(song?.shows ?? []);

  return (
    <div className="song">
      <h2>{song.name}</h2>
      <ul className="hoverable">
        {shows.map(({ linkid, formattedTitle }) => (
          <li key={linkid}>
            <Link href={`/recordings/${linkid}`}>{formattedTitle}</Link>
          </li>
        ))}
      </ul>
      {shows.length > 5 ? (
        <div>
          <br />
          Total: {shows.length}
        </div>
      ) : null}
      {song.comments.length > 0 ? <Comments comments={song.comments} /> : null}
    </div>
  );
}
