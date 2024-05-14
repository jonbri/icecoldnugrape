import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h2>Path Not Found</h2>
      <Link href="/">Home</Link>
    </div>
  );
}
