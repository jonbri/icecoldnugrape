import data from "../data/youtube_raw.json";
const YoutubeWidget = () => {
  function dayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    // @ts-ignore
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  const youtubeHash = data[dayOfYear() % data.length];
  const src = `https://www.youtube.com/embed/${youtubeHash}`;
  return (
    <div
      className="youtube"
      data-youtube-hash={youtubeHash}
      dangerouslySetInnerHTML={{
        __html: `
        <iframe
          width="420"
          height="315"
          src="${src}"
          frameborder="0"
          allowfullscreen></iframe>
      `,
      }}
    />
  );
};

export default YoutubeWidget;
