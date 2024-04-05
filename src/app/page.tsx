"use client";

import YoutubeWidget from "../components/YoutubeWidget";
import TwitterWidget from "../components/TwitterWidget";

export default function Page() {
  return (
    <div>
      {<YoutubeWidget />}
      <a href="https://twitter.com/search?q=%23jonathanrichman&src=typed_query&f=live">
        #JonathanRichman
      </a>
      {<TwitterWidget />}
    </div>
  );
}
