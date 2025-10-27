import Link from "next/link";
import { Comments } from "@/components/Comments";
import { getRecording, getRecordings } from "@/data";
import { SongInstance } from "@/types";

export async function generateStaticParams() {
  const paths = getRecordings().map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  return paths.map(({ params: { id: slug } }) => ({
    slug,
  }));
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug: id } = params;

  const { songs, comments, formattedTitle, jb, discogs, bandcamp } =
    getRecording(id)!;
  const sortedSongs =
    songs?.sort(({ n: n0 }, { n: n1 }) => {
      if (n0 > n1) return 1;
      else if (n0 < n1) return -1;
      return 0;
    }) ?? [];

  const set1 = sortedSongs.filter(({ set }) => set === 1);
  const set2 = sortedSongs.filter(({ set }) => set === 2);
  const set3 = sortedSongs.filter(({ set }) => set === 3);

  const hasSets = set2?.length > 0;
  const generateSetList = (set: SongInstance[]) => (
    <ul className="hoverable">
      {set.map(({ name, sanitized, n }) => (
        <li key={`${n}-${sanitized}`}>
          <Link href={`/songs/${sanitized}`}>{`${n}. ${name}`}</Link>
        </li>
      ))}
    </ul>
  );
  const generateSet = (set: SongInstance[]) =>
    set.length > 0 ? (
      <>
        <h3>Set {set[0].set}</h3>
        {generateSetList(set)}
      </>
    ) : null;
  return (
    <div className="recording">
      <h2>
        {formattedTitle}
        {jb ? <span className="asterisk">*</span> : null}
      </h2>

      {hasSets ? (
        <>
          {generateSet(set1)}
          {generateSet(set2)}
          {generateSet(set3)}
        </>
      ) : (
        generateSetList(sortedSongs)
      )}

      <ul className="links">
        <li>{discogs ? <Link href={discogs}>Discogs</Link> : null}</li>
        <li>{bandcamp ? <Link href={bandcamp}>Bandcamp</Link> : null}</li>
      </ul>

      <div className="thisrecordingisavailable">
        {jb === true ? (
          <div>
            This recording is{" "}
            <Link href="/trade">
              <strong>available</strong>
            </Link>
          </div>
        ) : null}
      </div>

      {comments.length > 0 ? <Comments comments={comments} /> : null}
    </div>
  );
}
