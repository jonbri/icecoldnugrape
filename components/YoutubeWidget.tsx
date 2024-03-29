import { useEffect, useState } from "react";
import data from "../data/youtube_raw.json";

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
