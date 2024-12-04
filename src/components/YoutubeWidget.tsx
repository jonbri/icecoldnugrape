"use client";

import { useEffect, useState } from "react";

const data = [
  "-gocJiFHHTQ",
  "1y8UWlhUP4M",
  "4W6af7Cj05I",
  "5HnhdYfwMMk",
  "5L9mwRYfans",
  "6IO8FiZV-6w",
  "6_SVoOwW4Yc",
  "87eocBt4PtA",
  "8ShO3ZdWThE",
  "8o90YWFlXdk",
  "96WAwhZLXsc",
  "AE4CFDvjPiM",
  "Ai7kk4K8Zmk",
  "BBgpM8nF69k",
  "B_exvKnrK6g",
  "E6KSt1u_UE0",
  "Fmosm661H4c",
  "HpmHpaCKXKw",
  "JmbhOa8NdG8",
  "Kc2iLAubras",
  "L677KFOecBo",
  "M6dBDc82om0",
  "RI5okqUxi2k",
  "SBxsqwrZClM",
  "Sh5rbyBoogc",
  "Te5ycfKK2Y0",
  "XjFU98mEem4",
  "YJG4bQxVIHM",
  "ZMF7Jq8xNGI",
  "ZqcTdFJh6DQ",
  "_CFsEfLM1Wc",
  "b4WgGOqgWbY",
  "blJldvAPwpQ",
  "fJYALKZZO_s",
  "k4ICbdgcAyc",
  "lNxTJYsegKU",
  "mtzUam87UTY",
  "nEmG5jIaWt4",
  "nu3TvC9CH18",
  "oBsHqVO_EKs",
  "oJfPGgr8080",
  "q5lq_FIjbOo",
  "rIKeLfYhzWg",
  "rWkbu_98fpo",
  "sS8u8IaJpbY",
  "un38w0sc13s",
  "w5OnYVFr_DA",
  "wLAsPSx6MXE",
  "xP3N2NU8Lb0",
  "yORR9d8hYZE",
  "ysaBHTwazjk",
];

const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.valueOf() - start.valueOf();
  return Math.floor(diff / oneDay);
};

export const YoutubeWidget = () => {
  const [youtubeHash, setYoutubeHash] = useState("");
  useEffect(() => {
    const hash = data[dayOfYear() % data.length];
    setYoutubeHash(hash);
  }, []);
  return (
    <div
      className="youtube"
      data-youtube-hash={youtubeHash}
      dangerouslySetInnerHTML={{
        __html: `
        <iframe
          width="420"
          height="315"
          src="${`https://www.youtube.com/embed/${youtubeHash}`}"
          frameborder="0"
          allowfullscreen></iframe>
      `,
      }}
    />
  );
};
