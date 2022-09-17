import type { NextPage } from "next";
import Layout from "../components/Layout";
import Sample from "../components/Sample";
import YoutubeWidget from "../components/YoutubeWidget";
import TwitterWidget from "../components/TwitterWidget";
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
];

const Home: NextPage = () => (
  <Layout type="index">
    <Sample text="jonathan" />
  </Layout>
);

export default Home;
