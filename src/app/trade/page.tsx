import Link from "next/link";
import { Total } from "@/components/Total";
import { getRecordings } from "@/data";

export default function Page() {
  const recordings = getRecordings();
  const all = recordings
    .filter(({ type }) => type !== "Album")
    .filter(({ jb }) => jb);
  const totalCount = all.length;
  return (
    <div>
      <div className="thisrecordingisavailable">
        <h2>Recordings avaiable for trade (or just ask me)</h2>
      </div>
      <div>Contact: icecoldnugrape@yahoo.com</div>
      <br />
      <div className="thisrecordingisavailable">
        <ul className="hoverable">
          {all.map(({ id, type, formattedTitle, format }) => {
            let doubleFormattedTitle = formattedTitle;
            if (type !== "Show" && type !== "Radio") {
              doubleFormattedTitle = `${type}: ${formattedTitle}`;
            }
            if (format !== undefined) {
              doubleFormattedTitle += ` (${format})`;
            }
            return (
              <li key={id}>
                <Link href={`/recordings/${id}`}>{doubleFormattedTitle}</Link>
              </li>
            );
          })}
        </ul>
        <Total>{totalCount}</Total>
      </div>
    </div>
  );
}
