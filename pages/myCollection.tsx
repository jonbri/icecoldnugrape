import { GetStaticProps } from "next";
import Link from "next/link";
import type { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { getRecordings, getSongs, Recording } from "../lib/data";

interface MyCollectionPageProps {
  recordings: Recording[];
}
interface Params extends ParsedUrlQuery {}
export const getStaticProps: GetStaticProps<
  MyCollectionPageProps,
  Params
> = async () => {
  const recordings = getRecordings();
  return {
    props: {
      recordings,
    },
  };
};

const MyCollectionPage: NextPage<MyCollectionPageProps> = ({ recordings }) => {
  return (
    <div className="myCollection">
      <Link href="/" className="back">
        Back
      </Link>
      <br />
      <h1>My Collection</h1>
      <ul>
        {recordings
          .filter(({ jon }) => jon === true)
          .map(({ linkid, formattedTitle }) => (
            <li key={linkid}>
              <a href={`recordings/${linkid}`}>{formattedTitle}</a>
            </li>
          ))}
      </ul>
      <br />
      <h2>Additional</h2>
      <div className="noPage">
        <ul>
          <li>1978-06-16 Stockholm, Sweeden, Radio</li>
          <li>1979-03-17 Leeds Polytechnic, UK</li>
          <li>1980 with J. Viglione, J. Hovorka, F. Pineau</li>
          <li>1980-07-18 West Hollywood, CA at The Roxy</li>
          <li>1984-07-01 Helsinki</li>
          <li>1984-07-29 Elephant Fayre</li>
          <li>1985-06-24 Torino Big Club Italy</li>
          <li>1986-01-19 Roxy LA CA</li>
          <li>1986-09-27 Maxwells</li>
          <li>1988-01-22 Amsterdam</li>
          <li>1988 02-12 Mezzago Bloom, Italy</li>
          <li>1988-07-10 Hoboken</li>
          <li>1988-11-10 Schoeps Teddy Ballgame</li>
          <li>1991-05-04 Sesto Calende Italy Sala Consilliare</li>
          <li>1991-06-17 Victoria, BC</li>
          <li>1991-09-30 Montreal, QC</li>
          <li>1997-03-12 Mercury Lounge, NYC</li>
          <li>1998-05-12 Amsterdam</li>
          <li>1998-05-18 NY, NY Coney Island High</li>
          <li>1998-11-09 Irving PlazaNY</li>
          <li>1999-10-16 Knitting Factory</li>
          <li>2003-04-l4 Verbano Park, Sesto Calende, Italy</li>
          <li>2004-04-10 Manchester, UK, Night and Day</li>
          <li>2004-05-05 Atlanta, GA, Echo Lounge</li>
          <li>2005-01-28 San Francisco, CA, Tsunami Relief Benefit</li>
          <li>2005-01-28 San Francisco, CA, Great American Music Hall</li>
          <li>2008-09-06 Paris Nouveau Casino</li>
          <li>2008-03-02 Atlanta, GA, The Earl</li>
          <li>2012-02-25 Leeds, UK, Brudenell Social Club</li>
          <li>2013-02-17 Carrboro, NC, Cats Cradle</li>
          <li>2013-11-21 NY, NY, Bowery Ballroom</li>
          <li>2013-11-22 NY, NY, Bowery Ballroom</li>
          <li>2013-12-05 Los Angeles, CA, The Mint</li>
          <li>2014-06-17 La Crosse, WI</li>
          <li>2014-06-19 Sheboygan, WI</li>
          <li>2014-11-15 Haybarn Theatre, Goddard College</li>
          <li>2015-03-06 Zanzabar, KY</li>
          <li>2015-10-30 Durham, NC, Duke Coffeehouse</li>
          <li>2015-11-01 Rocky Mount, VA, HarvesterPerformanceCenter</li>
          <li>2015-11-05 Lancaster, Chameleon Club </li>
          <li>2016-04-02</li>
          <li>2016-04-08 Charlotte, NC, The Evening Muse</li>
          <li>2016-04-19 Asheville, NC The Altamont</li>
          <li>2016-05-21</li>
          <li>2016-11-13 Avondale Estates, GA, Towne Cinema</li>
          <li>2016-11-14 Carborro, NC, Cats Cradle Backroom</li>
          <li>2018-02-23</li>
          <li>2018-10-16 Boston, MA, Middle East Club</li>
          <li>2019-02-20 Carrboro, NC, The Arts Center</li>
          <li>2022-10-13 Carrboro, NC, The Arts Center</li>
        </ul>
      </div>
    </div>
  );
};

export default MyCollectionPage;
