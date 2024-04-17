import { getRecordings } from "../../data";
import Link from "next/link";

interface Error {
  href: string;
  message: string;
}
export default function Page() {
  const errors: Error[] = [];
  const recordings = getRecordings();
  recordings.forEach(({ id, type, name, formattedTitle }) => {
    if (type === "Album" || type === "Single") {
      if (name === undefined) {
        errors.push({
          href: `/recordings/${id}`,
          message: `${formattedTitle} is missing a name`,
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
