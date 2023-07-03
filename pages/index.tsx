import type { NextPage } from "next";
import Layout from "../components/Layout";
import YoutubeWidget from "../components/YoutubeWidget";
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
    name: "My Collection",
    href: "/myCollection",
  },
];

const Home: NextPage = () => (
  <Layout type="index">
    <div className={cn.quickLinks}>
      <ul>
        {quickLinks.map(({ name, href }) => (
          <li key={name}>
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
    {<YoutubeWidget />}
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
