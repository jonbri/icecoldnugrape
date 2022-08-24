import type { NextPage } from "next";
import Layout from "../components/Layout";
import YoutubeWidget from "../components/YoutubeWidget";
// import Head from "next/head";
// import Image from "next/image";
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
        <h3 style={{ display: "inline", marginRight: "8px" }}>Quick Links:</h3>
        <ul>
          {quickLinks.map(({ name, href }) => (
            <li key={name}>
              <a href={href}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
      <h3>Video of the day</h3>
      {<YoutubeWidget />}
      <a href="https://twitter.com/jojo_blog">
        <h3>@jojo_blog</h3>
      </a>
      {<TwitterWidget />}
      <br />
    </Layout>
  );
};

export default Home;