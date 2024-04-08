import { getRecording, getRecordings } from "../../../data";
import { SongInstance } from "../../../types";
import Link from "next/link";

export async function generateStaticParams() {
  const paths = getRecordings().map(({ linkid: id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return paths.map((path) => ({
    slug: path.params.id,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const recording = getRecording(id)!;
  const sortedSongs =
    recording.songs?.sort(({ n: n0 }, { n: n1 }) => {
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
      <h2>{recording.formattedTitle}</h2>

      {hasSets ? (
        <>
          {generateSet(set1)}
          {generateSet(set2)}
          {generateSet(set3)}
        </>
      ) : (
        generateSetList(sortedSongs)
      )}

      {recording.quality !== undefined || recording.comments.length > 0 ? (
        <>
          {recording.quality && (
            <div className="quality">
              Best known quality: {recording.quality}
            </div>
          )}
          {recording.jon === true ? (
            <div className="quality">
              This recording is{" "}
              <Link href="/trade">
                <strong>available</strong>
              </Link>
            </div>
          ) : null}
          {recording.comments.length > 0 ? (
            <div className="comments">
              <ul>
                {recording.comments.map(({ name, text, time }) => (
                  <li key={time}>
                    <header>{`${name} (${time.split(" ")[0]})`}</header>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
