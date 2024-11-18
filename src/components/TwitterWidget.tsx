"use client";

import { useEffect } from "react";

const id = "twitter-wjs";
const TwitterWidget = () => {
  useEffect(() => {
    // remove existing script tag (if it exists)
    const oExistingScriptTag = document.getElementById(id);
    if (oExistingScriptTag)
      oExistingScriptTag.parentNode?.removeChild(oExistingScriptTag);

    // create new script tag
    const newScriptElement = document.createElement("script");
    newScriptElement.id = id;
    newScriptElement.async = true;
    newScriptElement.src = "//platform.twitter.com/widgets.js";

    // append script tag to document
    const scriptTags = document.getElementsByTagName("script")[0];
    scriptTags.parentNode?.insertBefore(newScriptElement, scriptTags);
  });

  return (
    <div className="twitter-container">
      <a className="twitter-timeline" href="https://twitter.com/jojo_blog">
        Loading...
      </a>
      <style jsx>{`
        .twitter-container {
          max-width: 418px;
        }
      `}</style>
    </div>
  );
};

export default TwitterWidget;
