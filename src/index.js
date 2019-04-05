/* global document, process */
import React from 'react';
import ReactDOM from 'react-dom';
import recordings from './recordings_raw.json';
import songs from './songs_raw.json';
import youtube_raw from './youtube_raw.json';
import downloads_raw from './downloads_raw.json';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './index.scss';
import './favicon.ico';

const aHeaderLinks = [
  { to: '/downloads', name: 'Downloads' },
  { to: '/recordings', name: 'Recordings' },
  { to: '/songs', name: 'Songs' },
  { to: '/search', name: 'Search' },
  { to: '/random', name: 'Random' }
];

const aQuickLinks = [
  { href: 'https://jojofiles.blogspot.com/', name: 'Blog' },
  { href: 'http://www.bluearrowrecords.com/record-label/jonathan-richman/', name: 'Label' },
  { href: 'https://www.highroadtouring.com/artists/jonathan-richman/', name: 'Tour' },
  { href: 'http://www.bobsnerdywebpage.com/', name: 'Bob' },
  { href: 'http://www.jojochords.com/index.html', name: 'Ramon' }
];

function getRecording(sId) {
  return recordings.filter(o => (o.linkid + '') === sId)[0];
}

function getSong(iSongId) {
  return songs
    .filter(song => parseInt(song.linkid, 10) === parseInt(iSongId, 10))
    .map(song => {
      song.recordingsHistory =
        recordings.filter(recording => recording.songs
          .filter(oSong => parseInt(oSong.linkid, 10) === parseInt(iSongId, 10))
          .length > 0
        );
      return song;
    })[0];
}

function getFormattedRecording(oRecording) {
  let sFormattedRecording = '';

  function formatDate(year, month, date) {
    let sFormattedDate = '';

    function numToMonth(num) {
      if (isNaN(num)) {
        return '';
      }
      return [
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
      ][parseInt(num) - 1];
    }

    if (year !== undefined) {
      year = year + '';
      sFormattedDate += year + ' ';
    }
    if (month !== undefined) {
      month = month + '';
      sFormattedDate += numToMonth(month) + ' ';
    }
    if (date !== undefined) {
      date = date + '';
      sFormattedDate += date + ' ';
    }
    return sFormattedDate;
  }

  // special label if it has type
  if (oRecording.type === 'Album') {
    return (oRecording.year + ' Album: ' + oRecording.name).trim();
  } else if (oRecording.type === 'Studio Bootleg') {
    return (oRecording.year + ' Studio Bootleg: ' + oRecording.name).trim();
  } else if (oRecording.type === 'Compilation') {
    return ('Compilation: ' + oRecording.name).trim();
  } else if (oRecording.type === 'Interview') {
    return (oRecording.year + ' Interview: ' + oRecording.name).trim();
  } else if (oRecording.type === 'TV') {
    return (oRecording.year + ' TV: ' + oRecording.name).trim();
  } else if (oRecording.type === 'Radio') {
    return (oRecording.year + ' Radio: ' + oRecording.name).trim();
  } else if (oRecording.type === 'Single') {
    return (oRecording.year + ' Single: ' + oRecording.name).trim();
  }

  if (oRecording.year || oRecording.month || oRecording.city) {
    sFormattedRecording += formatDate(oRecording.year, oRecording.month, oRecording.date);
  }

  if (oRecording.city) {
    sFormattedRecording += oRecording.city + ' ';
  }
  if (oRecording.sublocation) {
    sFormattedRecording += oRecording.sublocation + ' ';
  }
  if (oRecording.country) {
    sFormattedRecording += oRecording.country + ' ';
  }
  if (oRecording.venue) {
    sFormattedRecording += oRecording.venue + ' ';
  }
  if (oRecording.name) {
    sFormattedRecording += oRecording.name + ' ';
  }

  return sFormattedRecording.trim();
}

class YoutubeWidget extends React.Component {
  dayOfYear() {
    const now = new Date(),
      start = new Date(now.getFullYear(), 0, 0),
      diff = now - start,
      oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  render() {
    const src = `
      https://www.youtube.com/embed/${youtube_raw[this.dayOfYear() % youtube_raw.length]}
    `;
    return <div
      className='Home-youtubeVideo'
      dangerouslySetInnerHTML={{
        __html: `
          <iframe
            width="420"
            height="315"
            src="${src}"
            frameborder="0"
            allowfullscreen></iframe>
        `
      }}
    />;
  }
}

class TwitterWidget extends React.Component {
  componentDidMount() {
    const id = 'twitter-wjs';

    // remove existing script tag (if it exists)
    const oExistingScriptTag = document.getElementById(id);
    if (oExistingScriptTag) {
      oExistingScriptTag.parentNode.removeChild(oExistingScriptTag);
    }

    // create new script tag
    const newScriptElement = document.createElement('script');
    newScriptElement.id = id;
    newScriptElement.src = '//platform.twitter.com/widgets.js';

    // append script tag to document
    const scriptTags = document.getElementsByTagName('script')[0];
    scriptTags.parentNode.insertBefore(newScriptElement, scriptTags);
  }
  render() {
    return <div
      className='Home-twitter'
      dangerouslySetInnerHTML={{
        __html: `
          <a class="twitter-timeline"
          href="https://twitter.com/jojo_blog"
          data-widget-id="617408069627215872">loading...</a>
        `
      }}
    />;
  }
}

class Header extends React.Component {
  render() {
    return <header className='App-header'>
      <div>
        <Link to='/'>
          <h1 className='App-title'>ICECOLDNUGRAPE.COM</h1>
        </Link>
        <aside><a href='https://web.archive.org/web/*/icecoldnugrape.com'>Since 2009</a></aside>
        <ul>
          {aHeaderLinks.map(o => {
            return <li key={o.name}>
              <Link
                className={(this.props.activeLink === o.name) ? 'activeLink' : ''}
                to={o.to}>{o.name}
              </Link>
            </li>;
          })}
        </ul>
      </div>
    </header>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
    this.searchInputOnChange = this.searchInputOnChange.bind(this);
    this.searchInputOnKeyUp = this.searchInputOnKeyUp.bind(this);
  }

  searchInputOnChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }
  searchInputOnKeyUp(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  determineRecordingIndex(sRecordingId) {
    return recordings.indexOf(
      recordings
        .filter(function(o) {
          return parseInt(o.linkid, 10) === parseInt(sRecordingId, 10)
        })[0]
    );
  }

  determinePreviousRecording(sRecordingId) {
    return recordings[this.determineRecordingIndex(sRecordingId) - 1] || {};
  }

  determineNextRecording(sRecordingId) {
    return recordings[this.determineRecordingIndex(sRecordingId) + 1] || {};
  }

  generateSearchResults() {
    const sQuery = this.state.searchTerm;
    const aItems = [],
      searchRegex = new RegExp(sQuery, 'i'),
      re = new RegExp('(' + sQuery + ')', 'gi');

    if (sQuery === undefined || sQuery === '') {
      return;
    }

    function formattedSearchResult(match, sPrefix) {
      return (sPrefix || '') + match.replace(re, '<span class="Search-highlight">$1</span>');
    }

    // get recording matches
    // check against formatted recording value
    recordings.forEach(function(oRecording) {
      if (searchRegex.test(getFormattedRecording(oRecording))) {
        aItems.push({
          href: '/recordings/' + oRecording.linkid,
          text: formattedSearchResult(getFormattedRecording(oRecording))
        });
      }
    });

    // get song matches
    // check against formatted song value
    songs.forEach(function(oSong) {
      if (searchRegex.test(oSong['value'])) {
        aItems.push({
          href: '/songs/' + oSong.linkid,
          text: oSong['value']
        });
      }
    });

    // check against recording comments
    recordings.forEach(function(oRecording) {
      (oRecording.comments || []).forEach(function(oComment) {
        ['name', 'text']
          .filter(term => searchRegex.test(oComment[term]))
          .filter(term => /^(Bob)|(JB)$/.test(oComment[term]) === false)
          .forEach(function(term) {
            if (term === 'name') {
              aItems.push({
                  href: '/recordings/' + oRecording.linkid,
                  text: formattedSearchResult(oComment[term], 'Commenter: ')
              });
            } else if (term === 'text') {
              aItems.push({
                  href: '/recordings/' + oRecording.linkid,
                  text: formattedSearchResult(oComment[term], 'Comment: ')
              });
            }
          });
      });
    });

    // check against song comments
    songs.forEach(function(oSong) {
      (oSong.comments || []).forEach(function(oComment) {
        ['name', 'text']
          .filter(term => searchRegex.test(oComment[term]))
          .forEach(function(term) {
            aItems.push({
              href: '/songs/' + oSong.linkid,
              text: formattedSearchResult(oComment[term])
            })
          });
      });
    });

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
  }

  determineRandomPath() {
    if (Math.round(Math.random() * 10) > 1) { // 10% chance
      return '/recordings/' + recordings[Math.round(Math.random() * recordings.length) + 1].linkid;
    } else {
      return '/songs/' + songs[Math.round(Math.random() * songs.length) + 1].linkid;
    }
  }

  render() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
          {/* Home */}
          <Route exact path='/' render={() => (
            <div>
              <Header />
              <div className='App-body'>
                <div className='Home'>
                  <div className='Home-quickLinks'>
                    <h3>Quick Links: </h3>
                    <ul>
                    {aQuickLinks.map(o => (
                      <li key={o.name}><a href={o.href}>{o.name}</a></li>
                    ))}
                    </ul>
                  </div>

                  <h3>Video of the day</h3>
                  <YoutubeWidget />

                  <h3>Twitter</h3>
                  <TwitterWidget />
                </div>
              </div>
            </div>
          )}/>

          {/* Recordings */}
          <Route exact path='/recordings' render={() => (
            <div className='App'>
              <Header activeLink='Recordings' />
              <div className='App-body'>
                <div className='Recordings'>
                  <h2>Recordings</h2>
                  <ul>
                    {recordings
                      .filter(o => o.show !== false)
                      .map((o, i) => <li key={i}><Link to={'/recordings/' + o.linkid}>{getFormattedRecording(o)}</Link></li>)
                    }
                  </ul>
                  <div className='Recordings-bottomText'>
                    <p>
                    The majority of the data for this website came from <a href='http://www.bobsnerdywebpage.com/'>Bob&apos;s Nerdy Website</a>
                    </p>
                    <p>
                    Raw data: <a href='https://github.com/jonbri/icecoldnugrape/blob/master/src/recordings_raw.json'>recordings_raw.json</a>, <a href='https://github.com/jonbri/icecoldnugrape/blob/master/src/songs_raw.json'>songs_raw.json</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}/>

          {/* Recording */}
          <Route exact path={'/recordings/:recordingId'} render={props => (
            <div className='App'>
              <Header activeLink='Recordings' />
              <div className='App-body'>
                <div className='Recording'>
                  <h3>{getFormattedRecording(getRecording(props.match.params.recordingId))}</h3>
                  <div className='Recording-nextprev'>
                    <ul>
                      {this.determinePreviousRecording(props.match.params.recordingId).linkid &&
                        <li><Link to={'/recordings/' + this.determinePreviousRecording(props.match.params.recordingId).linkid}>Previous</Link></li>
                      }
                      {this.determineNextRecording(props.match.params.recordingId).linkid &&
                        <li><Link to={'/recordings/' + this.determineNextRecording(props.match.params.recordingId).linkid}>Next</Link></li>
                      }
                    </ul>
                  </div>
                  <ol>
                    {getRecording(props.match.params.recordingId).songs
                      .map((o, i) => <li key={i}><Link to={'/songs/' + o.linkid}>{getSong(o.linkid).value}</Link></li>)
                    }
                  </ol>

                  {(getRecording(props.match.params.recordingId).quality || getRecording(props.match.params.recordingId).comments.length > 0) &&
                    <div className='Recording-subcontent'>
                      {getRecording(props.match.params.recordingId).quality &&
                        <div className='Recording-metadata'>
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
              </div>
            </div>
          )}/>

          {/* Songs */}
          <Route exact path='/songs' render={() => (
            <div className='App'>
              <Header activeLink='Songs' />
              <div className='App-body'>
                <div className='Songs'>
                  <h2>Songs</h2>
                  <ul>
                  {songs
                    .map((o, i) => <li key={i}><Link to={'/songs/' + o.linkid}>{o.value}</Link></li>)
                  }
                  </ul>
                </div>
              </div>
            </div>
          )}/>

          {/* Song */}
          <Route exact path={'/songs/:songId'} render={props => (
            <div className='App'>
              <Header activeLink='Songs' />
              <div className='App-body'>
                <div className='Song'>
                  <h3>{getSong(props.match.params.songId).value}</h3>
                  <ul>
                  {getSong(props.match.params.songId).recordingsHistory
                    .map((o, i) => <li key={i}><Link to={'/recordings/' + o.linkid}>{getFormattedRecording(o)}</Link></li>)
                  }
                  </ul>

                  {getSong(props.match.params.songId).comments.length > 0 &&
                    <div className='Song-subcontent'>
                      <ul>
                        {getSong(props.match.params.songId).comments
                          .map((o, i) => <li key={i}><header>{o.name + ' (' + o.time.split(' ')[0] + ')'}</header>{o.text}</li>)
                        }
                      </ul>
                    </div>
                  }

                </div>
              </div>
            </div>
          )}/>

          {/* Downloads */}
          <Route exact path='/downloads' render={() => (
            <div className='App'>
              <Header activeLink='Downloads' />
              <div className='App-body'>
                <div className='Downloads'>
                  <h2>Downloads</h2>
                  {downloads_raw.map((oDownload, i) =>
                    <ul key={i}>
                      <li>

                        {oDownload.title !== '' &&
                          <h3>{oDownload.title}</h3>
                        }

                        {oDownload.zip &&
                          <a className='zip' href={'/media/' + oDownload.group + '/' + oDownload.zip}>Download All</a>
                        }

                        {oDownload.songs.map((oSong, j) =>
                          <ul key={j}>
                            <li>
                              <a href={'/media/' + oDownload.group + '/' + oSong.path}>{oSong.title}</a>
                            </li>
                          </ul>
                        )}
                        </li>
                      <br />
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}/>

          {/* Search */}
          <Route exact path='/search' render={() => (
            <div className='App'>
              <Header activeLink='Search' />
              <div className='App-body'>
                <div className='Search'>
                  <h2>Search</h2>
                  <input
                    autoFocus
                    value={this.state.searchTerm}
                    onKeyUp={this.searchInputOnKeyUp}
                    onChange={this.searchInputOnChange}
                  />
                  <br />
                  {this.generateSearchResults()}
                </div>
              </div>
            </div>
          )}/>

          {/* Random */}
          <Route exact path='/random' render={() => (
            <Redirect to={this.determineRandomPath()} />
          )}/>

        <div style={{height: '10px'}}></div>
      {/* end of App */}
    </BrowserRouter>;
  }
}

// render the full application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
