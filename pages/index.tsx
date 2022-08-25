import type { NextPage } from "next";
import Layout from "../components/Layout";
import YoutubeWidget from "../components/YoutubeWidget";
import TwitterWidget from "../components/TwitterWidget";
import cn from "../styles/Home.module.scss";

const quickLinks = [
  { href: "https://jojofiles.blogspot.com/", name: "Blog" },
  {
    href: "http://www.bluearrowrecords.com/record-label/jonathan-richman/",
    name: "Label",
  },
  {
    href: "https://www.highroadtouring.com/artists/jonathan-richman/",
    name: "Tour",
  },
  { href: "https://jonathanrichman.bandcamp.com/", name: "Bandcamp" },
  { href: "https://en.wikipedia.org/wiki/Jonathan_Richman", name: "Wiki" },
  { href: "http://www.jojochords.com/index.html", name: "Ramon" },
];

const Home: NextPage = () => {
  return (
    <Layout type="index">
      <div className={cn.quickLinks}>
        <h2>Quick Links:</h2>
        <ul>
          {quickLinks.map(({ name, href }) => (
            <li key={name}>
              <a href={href}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
      <h2>Video of the day</h2>
      {<YoutubeWidget />}
      <a href="https://twitter.com/jojo_blog">
        <h2>@jojo_blog</h2>
      </a>
      {<TwitterWidget />}
      <br />
      <style global jsx>{`
        h2 {
          display: inline;
          margin-right: 8px;
          font-weight: normal;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
