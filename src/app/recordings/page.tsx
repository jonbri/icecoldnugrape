import Link from "next/link";
import { getRecordings } from "@/data";
import { Recording } from "@/types";
import { Total } from "@/components/Total";

interface Section {
  title: string;
  collection: Recording[];
}

const sectionsData = [
  { key: "Album", title: "Albums" },
  { key: "Show", title: "Shows" },
  { key: "Single", title: "Singles" },
  { key: "Compilation", title: "Compilations" },
  { key: "Studio Bootleg", title: "Studio Bootlegs" },
  { key: "Radio", title: "Radio" },
  { key: "TV", title: "TV" },
  { key: "Interview", title: "Interviews" },
];

const filterByType =
  (targetType: string) =>
  ({ type }: Recording) =>
    type === targetType;

const generateList = ({ title, collection }: Section) => (
  <section key={title}>
    <h2>{`${title} (${collection.length})`}</h2>
    <ul className="hoverable">
      {collection.map(({ id, formattedTitle }) => (
        <li key={id}>
          <Link href={`/recordings/${id}`}>{formattedTitle}</Link>
        </li>
      ))}
    </ul>
  </section>
);

export default function Page() {
  const recordings = getRecordings();
  const sections = sectionsData.map(({ key, title }) => ({
    title,
    collection: recordings.filter(filterByType(key)),
  }));
  const total = sections.reduce(
    (acc, { collection: { length } }) => acc + length,
    0,
  );
  return (
    <div className="recordings">
      {sections.map(generateList)}
      <Total>{total}</Total>
    </div>
  );
}
