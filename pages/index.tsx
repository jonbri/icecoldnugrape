import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../src/components/Layout";
import YoutubeWidget from "../src/components/YoutubeWidget";
import TwitterWidget from "../src/components/TwitterWidget";

const quickLinks = [
  {
    name: "JojoBlog",
    href: "https://jojofiles.blogspot.com/",
  },
  {
    name: "Label",
    href: "http://www.bluearrowrecords.com/record-label/jonathan-richman/",
  },
  {
    name: "Tour",
    href: "https://www.highroadtouring.com/artists/jonathan-richman/",
  },
  {
    name: "Bandcamp",
    href: "https://jonathanrichman.bandcamp.com/",
  },
  {
    name: "JojoChords",
    href: "http://www.jojochords.com/index.html",
  },
  {
    name: "Trade",
    href: "/myCollection",
  },
];

const Home: NextPage = () => {
  return (
    <Layout type="index">
      <ul>
        {quickLinks.map(({ name, href }) => (
          <li key={name}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
      {<YoutubeWidget />}
      <a href="https://twitter.com/search?q=%23jonathanrichman&src=typed_query&f=live">
        #JonathanRichman
      </a>
      {<TwitterWidget />}
      <br />
    </Layout>
  );
};

export default Home;
