import Link from "next/link";
import { getSongs } from "@/data";
import { Total } from "@/components/Total";

export default function Page() {
  const songs = getSongs();
  return (
    <div className="songs">
      <ul className="hoverable">
        {songs.map(({ name, sanitized }) => (
          <li key={sanitized}>
            <Link href={`/songs/${sanitized}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <Total>{songs.length}</Total>
    </div>
  );
}
