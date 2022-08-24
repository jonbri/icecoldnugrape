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
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <a class="twitter-timeline"
        href="https://twitter.com/jojo_blog"
        data-widget-id="617408069627215872">loading...</a>
      `,
      }}
    />
  );
};

export default TwitterWidget;
