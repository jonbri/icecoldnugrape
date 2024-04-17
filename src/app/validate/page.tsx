import { getRecordings } from "../../data";
import Link from "next/link";

const unique = <T,>(value: T, index: number, array: T[]) =>
  array.indexOf(value) === index;

interface Error {
  href: string;
  message: string;
}
export default function Page() {
  const errors: Error[] = [];
  const recordings = getRecordings();
  recordings.forEach(({ id, type, name, jon, songs, formattedTitle }) => {
    if (type === "Album" || type === "Single") {
      if (name === undefined) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" is missing a name`,
        });
      }
      if (jon !== undefined) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" cannot be marked with "jon"`,
        });
      }
    }

    // check for duplicate "n" field
    if (songs) {
      const n = songs.map(({ n }) => n.toString());
      const uniqueN = n.filter(unique);
      if (n.length !== uniqueN.length) {
        errors.push({
          href: `/recordings/${id}`,
          message: `"${formattedTitle}" has duplicate "n" fields`,
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
