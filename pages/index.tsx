import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../src/components/Layout";
import YoutubeWidget from "../src/components/YoutubeWidget";
import TwitterWidget from "../src/components/TwitterWidget";
import cn from "../styles/Home.module.scss";

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

const Home: NextPage = () => (
  <Layout type="index">
    <div className={cn.quickLinks}>
      <ul>
        {quickLinks.map(({ name, href }) => (
          <li key={name}>
            {href.startsWith("http") ? (
              <a href={href}>{name}</a>
            ) : (
              <Link href={href}>Trade</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
    {<YoutubeWidget />}
    <a href="https://twitter.com/search?q=%23jonathanrichman&src=typed_query&f=live">
      #JonathanRichman
    </a>
    {<TwitterWidget />}
    <br />
    <style jsx>{`
      h2 {
        display: inline;
        margin-right: 8px;
        font-weight: normal;
      }
      li {
        font-size: 18px;
      }
    `}</style>
  </Layout>
);

export default Home;
