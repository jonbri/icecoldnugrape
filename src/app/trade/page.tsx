import Link from "next/link";
import { getRecordings } from "../../data";
import Total from "../../components/Total";

export default function Page() {
  const recordings = getRecordings();
  const all = recordings
    .filter(({ type }) => type !== "Album")
    .filter(({ jon }) => jon);
  const totalCount = all.length;
  return (
    <div>
      <ul className="hoverable">
        {all.map(({ id, type, formattedTitle }) => {
          let doubleFormattedTitle = formattedTitle;
          if (type !== "Show" && type !== "Radio") {
            doubleFormattedTitle = `${type}: ${formattedTitle}`;
          }
          return (
            <li key={id}>
              <Link href={`/recordings/${id}`}>{doubleFormattedTitle}</Link>
            </li>
          );
        })}
      </ul>
      <Total>{totalCount}</Total>
      <div className="available">Contact: icecoldnugrape@yahoo.com</div>
    </div>
  );
}
