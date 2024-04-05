import Link from "next/link";
import { getRecordings } from "../../data";

export default function Page() {
  const recordings = getRecordings();
  const all = recordings
    .filter(({ type }) => type !== "Album")
    .filter(({ jon }) => jon);
  const totalCount = all.length;
  return (
    <div>
      <ul className="hoverable">
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
      <br />
      Total: {totalCount}
      <br />
      <div className="available">Contact: icecoldnugrape@yahoo.com</div>
    </div>
  );
}
