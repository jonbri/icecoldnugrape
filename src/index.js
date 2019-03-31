import React from 'react';
import ReactDOM from 'react-dom';
import recordings from './recordings_raw.json';
import songs from './songs_raw.json';
import youtube_raw from './youtube_raw.json';
import downloads_raw from './downloads_raw.json';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import './index.css';
import './favicon.ico';

function getRecording(sId) {
  return recordings.filter(o => (o.linkid + "") === sId)[0];
}

function getSong(iSongId) {
  return songs
    .filter(o => parseInt(o.linkid, 10) === parseInt(iSongId, 10))
    .map(function(o) {
      o.recordingsHistory = recordings.slice(0)
        .filter(function(oRecording) {
          return oRecording.songs.slice(0)
            .filter(function(oSong) {
              return parseInt(oSong.linkid, 10) === parseInt(iSongId, 10);
            }).length > 0;
        })
        return o;
    })[0];
}

function generateSearchResults(sQuery) {
  var aItems = [],
    aRecordings = recordings,
    aSongs = songs,
    searchRegex = new RegExp(sQuery, "i"),
    re = new RegExp("(" + sQuery + ")", "gi");

  if (sQuery === undefined) {
    return;
  }

  function formattedSearchResult(match, sPrefix) {
    return (sPrefix || '') + match.replace(re, "<span class=\"Search-highlight\">$1</span>");
  }

  aRecordings.forEach(function(oRecording) {
    // check against formatted recording value
    if (searchRegex.test(formattedRecording(oRecording))) {
      aItems.push({
        href: "/recordings/" + oRecording.linkid,
        text: formattedSearchResult(formattedRecording(oRecording))
      });
    }

    // check against comments
    (oRecording.comments || []).forEach(function(oComment) {
      ["name", "text"]
        .filter(term => searchRegex.test(oComment[term]))
        .filter(term => /^(Bob)|(JB)$/.test(oComment[term]) === false)
        .forEach(function(term) {
          if (term === 'name') {
            aItems.push({
                href: "/recordings/" + oRecording.linkid,
                text: formattedSearchResult(oComment[term], 'Commenter: ')
            });
          } else if (term === 'text') {
            aItems.push({
                href: "/recordings/" + oRecording.linkid,
                text: formattedSearchResult(oComment[term], 'Comment: ')
            });
          }
        });
    });
  });

  aSongs.forEach(function(oSong) {
    // check against formatted song value
    if (searchRegex.test(oSong["value"])) {
      aItems.push({
        href: "/songs/" + oSong.linkid,
        text: oSong["value"]
      });
    }

    // check against song comments
    (oSong.comments || []).forEach(function(oComment) {
      ["name", "text"]
        .filter(term => searchRegex.test(oComment[term]))
        .forEach(function(term) {
          aItems.push({
            href: "/songs/" + oSong.linkid,
            text: formattedSearchResult(oComment[term])
          })
        });
    });
  });

  // TODO: uniq

  return <ul>{
    aItems.map((oItem, i) =>
      <li key={i}>
        <Link to={oItem.href}>
          <div
            dangerouslySetInnerHTML={{
              __html: oItem.text
            }}
          />
        </Link>
      </li>
    )
  }</ul>;
} // end of generateSearchResults

function formattedRecording(oRecording) {
  var s = "",
      type = oRecording.type,
      year = oRecording.year,
      month = oRecording.month,
      date = oRecording.date,
      city = oRecording.city,
      sublocation = oRecording.sublocation,
      country = oRecording.country,
      venue = oRecording.venue,
      name = oRecording.name;

  // special label if it has type
  if (type === 'Album') {
    return (year + " Album: " + name).trim();
  } else if (type === 'Studio Bootleg') {
    return (year + " Studio Bootleg: " + name).trim();
  } else if (type === 'Compilation') {
    return ("Compilation: " + name).trim();
  } else if (type === 'Interview') {
    return (year + " Interview: " + name).trim();
  } else if (type === 'TV') {
    return (year + " TV: " + name).trim();
  } else if (type === 'Radio') {
    return (year + " Radio: " + name).trim();
  } else if (type === 'Single') {
    return (year + " Single: " + name).trim();
  }

  if (year || month || city) {
    s += generatePrettyDate(year, month, date);
  }

  if (city) {
    s += city + " ";
  }
  if (sublocation) {
    s += sublocation + " ";
  }
  if (country) {
    s += country + " ";
  }
  if (venue) {
    s += venue + " ";
  }
  if (name) {
    s += name + " ";
  }

  return s.trim();
}

function generatePrettyDate(year, month, date) {
  var s = "";

  if (year !== undefined) {
    year = year + '';
    s += year + ' ';
  }

  if (month !== undefined) {
    month = month + '';
    s += numToMonth(month) + ' ';
  }

  if (date !== undefined) {
    date = date + '';
    s += date + ' ';
  }

  return s;
}

function numToMonth(num) {
  const aMonthMap = [
    'Jan','Feb','Mar',
    'Apr','May','Jun',
    'Jul','Aug','Sep',
    'Oct','Nov','Dec'
  ];

  var iNum;
  try {
    iNum = Number(num);
  } catch(e) {
     return "";
  }
  return aMonthMap[iNum - 1];
}

function determineRandomPath() {
  const aRecordings = recordings,
    aSongs = songs;
  if (Math.round(Math.random() * 10) > 1) { // 10% chance
    return "/recordings/" + aRecordings[Math.round(Math.random() * aRecordings.length) + 1].linkid;
  } else {
    return "/songs/" + aSongs[Math.round(Math.random() * aSongs.length) + 1].linkid;
  }
}

function generateYoutubeIframeHtml() {
  const now = new Date(),
    start = new Date(now.getFullYear(), 0, 0),
    diff = now - start,
    oneDay = 1000 * 60 * 60 * 24,
    dayOfYear = Math.floor(diff / oneDay);
  return `
    <iframe
      width="420"
      height="315"
      src="https://www.youtube.com/embed/${youtube_raw[dayOfYear % youtube_raw.length]}"
      frameborder="0"
      allowfullscreen></iframe>`;
}

function generateTwitterHtml() {
  return `
      <a class="twitter-timeline"
      href="https://twitter.com/jojo_blog"
      data-widget-id="617408069627215872">loading...</a>
  `;
}

class TwitterWidget extends React.Component {
  componentDidMount() {
    var id = "twitter-wjs";

    // remove existing script tag (if it exists)
    const oExistingScriptTag = document.getElementById(id);
    if (oExistingScriptTag) {
      oExistingScriptTag.parentNode.removeChild(oExistingScriptTag);
    }

    // create new script tag
    const newScriptElement = document.createElement("script");
    newScriptElement.id = id;
    newScriptElement.src = "//platform.twitter.com/widgets.js";

    // append script tag to document
    const scriptTags = document.getElementsByTagName("script")[0];
    scriptTags.parentNode.insertBefore(newScriptElement, scriptTags);
  }
  render() {
    return <div
      className="Home-twitter"
      dangerouslySetInnerHTML={{
        __html: generateTwitterHtml()
      }}
    />;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'zzzzzzz' // TODO
    };
    this.runSearch = this.runSearch.bind(this);
  }
  runSearch(s) {
    this.setState({
      searchTerm: s
    });
  }

  determinePreviousRecording(sRecordingId) {
    var aRecordings = recordings;
    var i = aRecordings.length - 1;
    for (; i > 0; i--) {
        if (parseInt(aRecordings[i].linkid, 10) === parseInt(sRecordingId, 10)) {
            break;
        }
    }
    if (aRecordings[i - 1]) {
        return aRecordings[i - 1];
    }
    return {};
  }

  determineNextRecording(sRecordingId) {
    var aRecordings = recordings;
    var i =  0;
    for (; i < aRecordings.length; i++) {
        if (parseInt(aRecordings[i].linkid, 10) === parseInt(sRecordingId, 10)) {
            break;
        }
    }
    if (aRecordings[i + 1]) {
        return aRecordings[i + 1];
    }
    return {};
  }

  render() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <div>
            <Link to="/">
              <h1 className="App-title">ICECOLDNUGRAPE.COM</h1>
            </Link>
            <aside>Est. 2009</aside>
            <ul>
              <li><Link to="/downloads">Downloads</Link></li>
              <li><Link to="/recordings">Recordings</Link></li>
              <li><Link to="/songs">Songs</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/random">Random</Link></li>
            </ul>
          </div>
        </header>

        <div className="App-body">

          {/* Home */}
          <Route exact path="/" render={props => (
            <div className="Home">
              <div className="Home-essentialLinks">
                <h3>Quick Links: </h3>
                <ul>
                <li><a href="https://jojofiles.blogspot.com/">Blog</a></li>
                <li><a href="http://www.bluearrowrecords.com/record-label/jonathan-richman/">Label</a></li>
                <li><a href="https://www.highroadtouring.com/artists/jonathan-richman/">Tour</a></li>
                <li><a href="http://www.bobsnerdywebpage.com/">Bob</a></li>
                <li><a href="http://www.jojochords.com/index.html">Ramon</a></li>
                </ul>
              </div>

              <h3>Video of the day</h3>
              <div
                className="Home-youtubeVideo"
                dangerouslySetInnerHTML={{
                  __html: generateYoutubeIframeHtml()
                }}
              />

              <h3>Twitter</h3>
              <TwitterWidget />
            </div>
          )}/>

          {/* Recordings */}
          <Route exact path="/recordings" render={props => (
            <div className="Recordings">
              <h2>Recordings</h2>
              <ul>
                {recordings
                  .filter(o => o.show !== false)
                  .map((o, i) => <li key={i}><Link to={"/recordings/" + o.linkid}>{formattedRecording(o)}</Link></li>)
                }
              </ul>
              <div className="Recordings-bottomText">
                <p>
                The majority of the data for this website came from <a href="http://www.bobsnerdywebpage.com/">Bob's Nerdy Website</a>
                </p>
                <p>
                Raw data: <a href="https://github.com/jonbri/icecoldnugrape/blob/master/src/recordings_raw.json">recordings_raw.json</a>, <a href="https://github.com/jonbri/icecoldnugrape/blob/master/src/songs_raw.json">songs_raw.json</a>
                </p>
              </div>
            </div>
          )}/>

          {/* Recording */}
          <Route exact path={"/recordings/:recordingId"} render={props => (
            <div className="Recording">
              <h3>{formattedRecording(getRecording(props.match.params.recordingId))}</h3>
              <div className="Recording-nextprev">
                <ul>
                  {this.determinePreviousRecording(props.match.params.recordingId).linkid &&
                    <li><Link to={"/recordings/" + this.determinePreviousRecording(props.match.params.recordingId).linkid}>Previous</Link></li>
                  }
                  {this.determineNextRecording(props.match.params.recordingId).linkid &&
                    <li><Link to={"/recordings/" + this.determineNextRecording(props.match.params.recordingId).linkid}>Next</Link></li>
                  }
                </ul>
              </div>
              <ol>
                {getRecording(props.match.params.recordingId).songs
                  .map((o, i) => <li key={i}><Link to={"/songs/" + o.linkid}>{getSong(o.linkid).value}</Link></li>)
                }
              </ol>

              {(getRecording(props.match.params.recordingId).quality || getRecording(props.match.params.recordingId).comments.length > 0) &&
                <div className="Recording-subcontent">
                  {getRecording(props.match.params.recordingId).quality &&
                    <div className="Recording-metadata">
                      <label>Best known quality:</label>&nbsp;{getRecording(props.match.params.recordingId).quality}
                    </div>
                  }

                  {getRecording(props.match.params.recordingId).comments.length > 0 &&
                    <ul>
                      {getRecording(props.match.params.recordingId).comments
                        .map((o, i) => <li key={i}><header>{o.name + ' (' + o.time.split(' ')[0] + ')'}</header>{o.text}</li>)
                      }
                    </ul>
                  }
                </div>
              }
            </div>
          )}/>

          {/* Songs */}
          <Route exact path="/songs" render={props => (
            <div className="Songs">
              <h2>Songs</h2>
              <ul>
              {songs
                .map((o, i) => <li key={i}><Link to={"/songs/" + o.linkid}>{o.value}</Link></li>)
              }
              </ul>
            </div>
          )}/>

          {/* Song */}
          <Route exact path={"/songs/:songId"} render={props => (
            <div className="Song">
              <h3>{getSong(props.match.params.songId).value}</h3>
              <ul>
              {getSong(props.match.params.songId).recordingsHistory
                .map((o, i) => <li key={i}><Link to={"/recordings/" + o.linkid}>{formattedRecording(o)}</Link></li>)
              }
              </ul>

              {getSong(props.match.params.songId).comments.length > 0 &&
                <div className="Song-subcontent">
                  <ul>
                    {getSong(props.match.params.songId).comments
                      .map((o, i) => <li key={i}><header>{o.name + ' (' + o.time.split(' ')[0] + ')'}</header>{o.text}</li>)
                    }
                  </ul>
                </div>
              }

            </div>
          )}/>

          {/* Downloads */}
          <Route exact path="/downloads" render={props => (
            <div className="Downloads">
              <h2>Downloads</h2>
              {downloads_raw.map((oDownload, i) =>
                <ul key={i}>
                  <li>

                    {oDownload.title !== "" &&
                      <h3>{oDownload.title}</h3>
                    }

                    {oDownload.zip &&
                      <a className="zip" href={"/media/" + oDownload.group + "/" + oDownload.zip}>Download All</a>
                    }

                    {oDownload.songs.map((oSong, j) =>
                      <ul key={j}>
                        <li>
                          <a href={"/media/" + oDownload.group + "/" + oSong.path}>{oSong.title}</a>
                        </li>
                      </ul>
                    )}
                    </li>
                  <br />
                </ul>
              )}
            </div>
          )}/>

          {/* Search */}
          <Route exact path="/search" render={props => (
            <div className="Search">
              <h2>Search</h2>
              <input
                onKeyUp={
                  (event) => {
                    this.runSearch(event.target.value);
                  }
                }
              />
              <br />
              {generateSearchResults(this.state.searchTerm)}
            </div>
          )}/>

          {/* Random */}
          <Route exact path="/random" render={props => (
            <Redirect to={determineRandomPath()} />
          )}/>

        {/* end of App-body */}
        </div>

        <div style={{height: '10px'}}></div>
      {/* end of App */}
      </div>
    </BrowserRouter>;
  }
}

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'));
};
render();
