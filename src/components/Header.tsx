import Link from "next/link";
import { Toolbar } from "@/components/Toolbar";

export const Header = () => {
  return (
    <header>
      <div id="header-content">
        <h1>
          <Link href="/">icecoldnugrape.com</Link>
        </h1>
        <Toolbar />
      </div>
    </header>
  );
};
