import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRandomUrl } from "@/data";

// TODO: does this need to be a separate file (it's only used in Header.tsx)?
// Does it need a directive?
export const RandomLink = () => {
  const [url, setUrl] = useState(".");
  const pathname = usePathname();
  const id = pathname.split("/").reverse()[0];
  useEffect(() => {
    setUrl(getRandomUrl());
  }, [id]);
  return <Link href={url}>Random</Link>;
};
