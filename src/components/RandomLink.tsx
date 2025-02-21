"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRandomUrl } from "@/data";

export const RandomLink = () => {
  const [url, setUrl] = useState(".");
  const pathname = usePathname();
  const id = pathname.split("/").reverse()[0];
  useEffect(() => {
    setUrl(getRandomUrl());
  }, [id]);
  return <Link href={url}>Random</Link>;
};
