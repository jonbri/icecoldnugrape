import Link from "next/link";
import { getRecordings } from "@/data";

const unique = <T,>(value: T, index: number, array: T[]) =>
  array.indexOf(value) === index;

interface Error {
  href: string;
  message: string;
}
export default function Page() {
  const errors: Error[] = [];
  const recordings = getRecordings();
  recordings.forEach(({ id, type, name, jb, songs, formattedTitle }) => {
    if (type === "Album" || type === "Single") {
      if (name === undefined) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" is missing a name`,
        });
      }
      if (jb !== undefined) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" cannot be marked with "jb"`,
        });
      }
    }

    // check for duplicate song numbers ("n" field)
    if (songs) {
      const songNumbers = songs.map(({ n }) => n);
      const uniqueSongNumbers = songNumbers.filter(unique);
      if (songNumbers.length !== uniqueSongNumbers.length) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" has duplicate "n" fields`,
        });
      }
    }

    // check for skipped/non-sequential song numbers
    if (songs) {
      const songNumbers = songs.map(({ n }) => n);
      if (songNumbers.length > 0 && songNumbers[0] !== 1) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" does not start with track 1`,
        });
      }
      const isSequential = songNumbers.every((n, index) => {
        if (index === 0) return true;
        return n === songNumbers[index - 1] + 1;
      });
      if (!isSequential) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" has skipped "n" fields`,
        });
      }
    }
  });
  return errors.length > 0 ? (
    <div>
      <h2>Errors</h2>
      <ul>
        {errors.map(({ href, message }, index) => (
          <li key={index}>
            <Link href={href}>{message}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>No errors found</div>
  );
}
