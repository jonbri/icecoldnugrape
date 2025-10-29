import Link from "next/link";
import { Toolbar } from "@/components/Toolbar";

export const Header = () => {
  return (
    <header>
      <div id="header-content">
        <div className="header-brand">
          <div className="brand-text">
            <h1>
              <Link href="/">icecoldnugrape</Link>
            </h1>
            <span className="brand-subtitle">Jonathan Richman Archive</span>
          </div>
        </div>
        <Toolbar />
      </div>
    </header>
  );
};
