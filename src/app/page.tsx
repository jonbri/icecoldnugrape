"use client";

import YoutubeWidget from "../components/YoutubeWidget";
import TwitterWidget from "../components/TwitterWidget";
import Link from "next/link";

const links = {
  bandcamp: <Link href="https://jonathanrichman.bandcamp.com/">Bandcamp</Link>,
  tour: (
    <Link href="https://www.highroadtouring.com/artists/jonathan-richman/">
      Tour
    </Link>
  ),
  label: (
    <Link href="http://www.bluearrowrecords.com/record-label/jonathan-richman/">
      Label
    </Link>
  ),
  jojochords: <Link href="http://www.jojochords.com/index.html">Chords</Link>,
  jojoblog: <Link href="https://jojofiles.blogspot.com/">Blog</Link>,
  trade: <Link href="/trade">Trade</Link>,
};

export default function Page() {
  return (
    <div>
      <div className="external-links">
        <ul className="inline">
          <li>{links.bandcamp}</li>
          <li>{links.tour}</li>
          <li>{links.label}</li>
          <li>{links.jojochords}</li>
          <li>{links.jojoblog}</li>
        </ul>
        <ul className="inline">
          <li>
            <a href="https://twitter.com/search?q=%23jonathanrichman&src=typed_query&f=live">
              #JonathanRichman
            </a>
          </li>
          <li>
            <a href="r/jonathanrichman">r/jonathanrichman</a>
          </li>
        </ul>
      </div>
      {<YoutubeWidget />}
      {<TwitterWidget />}
      <br />
      <ul>
        <li>{links.trade} </li>
        <li>
          <Link href="https://github.com/jonbri/icecoldnugrape">GitHub</Link>
        </li>
        <li>
          <Link href="https://web.archive.org/web/*/icecoldnugrape.com">
            Since 2009
          </Link>
        </li>
      </ul>
    </div>
  );
}
