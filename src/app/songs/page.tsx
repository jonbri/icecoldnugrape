import Link from "next/link";
import { getSongs } from "../../data";

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
      {`Total songs: ${songs.length}`}
    </div>
  );
}
