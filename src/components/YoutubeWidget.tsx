import { useEffect, useState } from "react";

const data = [
  "Ai7kk4K8Zmk",
  "ZqcTdFJh6DQ",
  "AE4CFDvjPiM",
  "yORR9d8hYZE",
  "E6KSt1u_UE0",
  "nu3TvC9CH18",
  "q5lq_FIjbOo",
  "ZqcTdFJh6DQ",
  "AE4CFDvjPiM",
  "ZqcTdFJh6DQ",
  "xP3N2NU8Lb0",
  "ZMF7Jq8xNGI",
  "XjFU98mEem4",
  "B_exvKnrK6g",
  "Kc2iLAubras",
  "87eocBt4PtA",
  "yORR9d8hYZE",
  "96WAwhZLXsc",
  "blJldvAPwpQ",
  "ysaBHTwazjk",
  "k4ICbdgcAyc",
  "fJYALKZZO_s",
  "w5OnYVFr_DA",
  "5L9mwRYfans",
  "L677KFOecBo",
  "BBgpM8nF69k",
  "un38w0sc13s",
  "8o90YWFlXdk",
  "oJfPGgr8080",
  "Fmosm661H4c",
  "RI5okqUxi2k",
  "lNxTJYsegKU",
  "6_SVoOwW4Yc",
  "Sh5rbyBoogc",
  "wLAsPSx6MXE",
  "rWkbu_98fpo",
  "rIKeLfYhzWg",
  "Te5ycfKK2Y0",
  "4W6af7Cj05I",
  "YJG4bQxVIHM",
  "oBsHqVO_EKs",
  "JmbhOa8NdG8",
  "SBxsqwrZClM",
  "_CFsEfLM1Wc",
  "b4WgGOqgWbY",
  "B_exvKnrK6g",
  "oJfPGgr8080",
  "5HnhdYfwMMk",
  "M6dBDc82om0",
  "mtzUam87UTY",
  "8ShO3ZdWThE",
  "-gocJiFHHTQ",
];

const oneDay = 1000 * 60 * 60 * 24;
const dayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.valueOf() - start.valueOf();
  return Math.floor(diff / oneDay);
};

const YoutubeWidget = () => {
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

export default YoutubeWidget;
