import { useEffect } from "react";

const TwitterWidget = () => {
  useEffect(function () {
    const id = "twitter-wjs";

    // remove existing script tag (if it exists)
    const oExistingScriptTag = document.getElementById(id);
    if (oExistingScriptTag) {
      oExistingScriptTag.parentNode?.removeChild(oExistingScriptTag);
    }

    // create new script tag
    const newScriptElement = document.createElement("script");
    newScriptElement.id = id;
    newScriptElement.src = "//platform.twitter.com/widgets.js";

    // append script tag to document
    const scriptTags = document.getElementsByTagName("script")[0];
    scriptTags.parentNode?.insertBefore(newScriptElement, scriptTags);
  });

  return (
    <>
      <br />
      <a className="twitter-timeline" href="https://twitter.com/jojo_blog">
        Loading...
      </a>
    </>
  );
};

export default TwitterWidget;
