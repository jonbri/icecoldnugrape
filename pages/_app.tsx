import type { AppProps } from "next/app";
import "../src/global.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
