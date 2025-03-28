import Link from "next/link";
import { YoutubeWidget } from "@/components/YoutubeWidget";

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
  contact: <Link href="/contact">Contact</Link>,
  validate: <Link href="/validate">Validate</Link>,
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
        <ul className="inline social">
          <li>
            <a href="https://www.reddit.com/r/jonathanrichman/">
              r/jonathanrichman
            </a>
          </li>
          <li>
            <a href="https://twitter.com/search?q=%23jonathanrichman&src=typed_query&f=live">
              #JonathanRichman
            </a>
          </li>
        </ul>
      </div>
      {<YoutubeWidget />}
      <ul>
        <li>{links.contact} </li>
        <li>
          <Link href="https://github.com/jonbri/icecoldnugrape/commits/main/">
            Changes
          </Link>
        </li>
        <li>
          <Link href="https://github.com/jonbri/icecoldnugrape/issues">
            Issues
          </Link>
        </li>
        <li>
          <Link href="https://github.com/jonbri/icecoldnugrape">GitHub</Link>
        </li>
        <li>{links.validate} </li>
        <li>
          <Link href="https://web.archive.org/web/*/icecoldnugrape.com">
            Since 2009
          </Link>
        </li>
      </ul>
    </div>
  );
}
