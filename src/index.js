/* global document, process */
import React, { useEffect, useState } from 'react';
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
    return (`${oRecording.name} (${oRecording.year})`).trim();
  } else if (oRecording.type === 'Studio Bootleg') {
    return (`${oRecording.name} (studio bootleg, ${oRecording.year})`).trim();
  } else if (oRecording.type === 'Compilation') {
    return (`${oRecording.name} (compilation)`).trim();
  } else if (oRecording.type === 'Interview') {
    return (`${oRecording.name} (${oRecording.year})`).trim();
  } else if (oRecording.type === 'TV') {
    return (`${oRecording.name} (${oRecording.year})`).trim();
  } else if (oRecording.type === 'Radio') {
    return (`${oRecording.name} (${oRecording.year})`).trim();
  } else if (oRecording.type === 'Single') {
    return (`${oRecording.name} (single, ${oRecording.year})`).trim();
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

function YoutubeWidget() {
  function dayOfYear() {
    const now = new Date(),
      start = new Date(now.getFullYear(), 0, 0),
      diff = now - start,
      oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  const src = `
    https://www.youtube.com/embed/${youtube_raw[dayOfYear() % youtube_raw.length]}
  `;
  return <div
    className='youtube'
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

function TwitterWidget() {
  useEffect(function() {
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
  });

  return <div
    dangerouslySetInnerHTML={{
      __html: `
        <a class="twitter-timeline"
        href="https://twitter.com/jojo_blog"
        data-widget-id="617408069627215872">loading...</a>
      `
    }}
  />;
}

function Header(props) {
  return <header className='app-header'>
    <div>
      <Link to='/'>
        <h1 className='app-title'>ICECOLDNUGRAPE.COM</h1>
      </Link>
      <aside><a href='https://web.archive.org/web/*/icecoldnugrape.com'>Since 2009</a></aside>
      <ul>
        {aHeaderLinks.map(o => {
          return <li key={o.name}>
            <Link
              className={(props.activeLink === o.name) ? 'activeLink' : ''}
              to={o.to}>{o.name}
            </Link>
          </li>;
        })}

        {props.previousRecording &&
          <li className="previousLink">
            <Link to={'/recordings/' + props.previousRecording.linkid}>Previous</Link>
          </li>
        }
        {props.nextRecording &&
          <li className="nextLink">
            <Link to={'/recordings/' + props.nextRecording.linkid}>Next</Link>
          </li>
        }
      </ul>
    </div>
  </header>;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  function setSearchTermFromDomEvent(e) {
    setSearchTerm(e.target.value);
  }

  function determineRecordingIndex(sRecordingId) {
    return recordings.indexOf(
      recordings
        .filter(function(o) {
          return parseInt(o.linkid, 10) === parseInt(sRecordingId, 10)
        })[0]
    );
  }

  function generateSearchResults() {
    const sQuery = searchTerm;
    const aItems = [],
      searchRegex = new RegExp(sQuery, 'i'),
      re = new RegExp('(' + sQuery + ')', 'gi');

    if (sQuery === undefined || sQuery === '') {
      return;
    }

    function formattedSearchResult(match, sPrefix) {
      return (sPrefix || '') + match.replace(re, '<span class="highlight">$1</span>');
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

  function determineRandomPath() {
    if (Math.round(Math.random() * 10) > 1) { // 10% chance
      return '/recordings/' + recordings[Math.round(Math.random() * recordings.length) + 1].linkid;
    } else {
      return '/songs/' + songs[Math.round(Math.random() * songs.length) + 1].linkid;
    }
  }

  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* Home */}
    <Route exact path='/' render={() => (
      <div>
        <Header />
        <div className='app-body'>
          <div className='home'>
            <div className='quickLinks'>
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
      <div className='app'>
        <Header activeLink='Recordings' />
        <div className='app-body'>
          <div className='recordings'>
            <h2>Recordings</h2>
            <ul>
              {recordings
                .filter(o => o.show !== false)
                .map((o, i) => <li key={i}><Link to={'/recordings/' + o.linkid}>{getFormattedRecording(o)}</Link></li>)
              }
            </ul>
            <div className='bottomText'>
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
      <div className='app'>
        <Header
          activeLink='Recordings'
          recordingId={props.match.params.recordingId}
          previousRecording={recordings[determineRecordingIndex(props.match.params.recordingId) - 1]}
          nextRecording={recordings[determineRecordingIndex(props.match.params.recordingId) + 1]}
        />
        <div className='app-body'>
          <div className='recording'>
            <h3>{getFormattedRecording(getRecording(props.match.params.recordingId))}</h3>
            <ol>
              {getRecording(props.match.params.recordingId).songs
                .map((o, i) =>
                  <li key={i}>
                    <Link to={'/songs/' + o.linkid}>{i + 1}. {getSong(o.linkid).value}</Link>
                  </li>
                )
              }
            </ol>

            {(getRecording(props.match.params.recordingId).quality || getRecording(props.match.params.recordingId).comments.length > 0) &&
              <div className='subcontent'>
                {getRecording(props.match.params.recordingId).quality &&
                  <div className='recording-metadata'>
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
      <div className='app'>
        <Header activeLink='Songs' />
        <div className='app-body'>
          <div className='songs'>
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
      <div className='app'>
        <Header activeLink='Songs' />
        <div className='app-body'>
          <div className='song'>
            <h3>{getSong(props.match.params.songId).value}</h3>
            <ul>
            {getSong(props.match.params.songId).recordingsHistory
              .map((o, i) => <li key={i}><Link to={'/recordings/' + o.linkid}>{getFormattedRecording(o)}</Link></li>)
            }
            </ul>

            {getSong(props.match.params.songId).comments.length > 0 &&
              <div className='subcontent'>
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
      <div className='app'>
        <Header activeLink='Downloads' />
        <div className='app-body'>
          <div className='downloads'>
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
      <div className='app'>
        <Header activeLink='Search' />
        <div className='app-body'>
          <div className='search'>
            <h2>Search</h2>
            <input
              autoFocus
              value={searchTerm}
              onKeyUp={setSearchTermFromDomEvent}
              onChange={setSearchTermFromDomEvent}
            />
            <br />
            {generateSearchResults()}
          </div>
        </div>
      </div>
    )}/>

    {/* Random */}
    <Route exact path='/random' render={() => (
      <Redirect to={determineRandomPath()} />
    )}/>

    <div style={{height: '10px'}}></div>
  </BrowserRouter>;
}

// render the full application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
