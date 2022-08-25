import recordingsData from "../data/recordings_raw.json";
import songsData from "../data/songs_raw.json";

export interface GoodComment {
  name: string;
  text: string;
  time: string;
  bob?: number;
}
export interface GoodSong {
  linkid: number;
  value: string;
  comments: GoodComment[];
  shows: number[];
}
export interface GoodSongInstance extends GoodSong {
  n: number;
}
export interface GoodRecording {
  linkid: number;
  type: string;
  venue?: string;
  country?: string;
  city?: string;
  quality?: string;
  month?: number;
  date?: number;
  year?: number;
  sublocation?: string;
  jon?: number;
  songs?: GoodSongInstance[];
  comments: GoodComment[];
  formattedTitle: string;
  prev: number | null;
  next: number | null;
  name?: string;
}

const deriveFormattedTitle = (oRecording: any) => {
  let sFormattedRecording = "";

  function formatDate(year: any, month: any, date: any) {
    let sFormattedDate = "";

    function numToMonth(num: any) {
      if (isNaN(num)) {
        return "";
      }
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][parseInt(num) - 1];
    }

    if (year !== undefined) {
      year = year + "";
      sFormattedDate += year + " ";
    }
    if (month !== undefined) {
      month = month + "";
      sFormattedDate += numToMonth(month) + " ";
    }
    if (date !== undefined) {
      date = date + "";
      sFormattedDate += date + " ";
    }
    return sFormattedDate;
  }

  // special label if it has type
  if (oRecording.type === "Album") {
    return `${oRecording.name} (${oRecording.year})`.trim();
  } else if (oRecording.type === "Studio Bootleg") {
    return `${oRecording.name} (studio bootleg, ${oRecording.year})`.trim();
  } else if (oRecording.type === "Compilation") {
    return `${oRecording.name} (compilation)`.trim();
  } else if (oRecording.type === "Interview") {
    return `${oRecording.name} (${oRecording.year})`.trim();
  } else if (oRecording.type === "TV") {
    return `${oRecording.name} (${oRecording.year})`.trim();
  } else if (oRecording.type === "Radio") {
    return `${oRecording.name} (${oRecording.year})`.trim();
  } else if (oRecording.type === "Single") {
    return `${oRecording.name} (single, ${oRecording.year})`.trim();
  }

  if (oRecording.year || oRecording.month || oRecording.city) {
    sFormattedRecording += formatDate(
      oRecording.year,
      oRecording.month,
      oRecording.date
    );
  }

  if (oRecording.city) {
    sFormattedRecording += oRecording.city + " ";
  }
  if (oRecording.sublocation) {
    sFormattedRecording += oRecording.sublocation + " ";
  }
  if (oRecording.country) {
    sFormattedRecording += oRecording.country + " ";
  }
  if (oRecording.venue) {
    sFormattedRecording += oRecording.venue + " ";
  }
  if (oRecording.name) {
    sFormattedRecording += oRecording.name + " ";
  }

  return sFormattedRecording.trim();
};

const generateGoodRecordings = () => {
  const goodRecordings = [];
  const length = recordingsData.length;
  for (let i = 0; i < length; i++) {
    const rawRecording = recordingsData[i];
    goodRecordings.push({
      ...rawRecording,
      songs: rawRecording.songs.map(({ linkid, n }) => ({
        ...goodSongs.find((goodSong) => goodSong.linkid === linkid)!,
        n,
      })),
      next: i < length - 1 ? recordingsData[i + 1]?.linkid : null,
      prev: i > 0 ? recordingsData[i - 1]?.linkid : null,
      formattedTitle: deriveFormattedTitle(rawRecording),
    });
  }
  return goodRecordings;
};
const generateGoodSongs = () =>
  songsData.map((rawSong) => ({
    ...rawSong,
    shows: recordingsData
      .filter(({ songs }) =>
        songs.map(({ linkid }) => linkid).includes(rawSong.linkid)
      )
      .map(({ linkid }) => linkid),
  }));

const goodSongs: GoodSong[] = generateGoodSongs();
const goodRecordings: GoodRecording[] = generateGoodRecordings();

export const getRecordings = () => {
  return goodRecordings;
};

export const getRecording = (id: string) => {
  for (const recording of goodRecordings) {
    if (recording.linkid === Number(id)) return recording;
  }
};

export const idsToShows = (ids: number[]) => {
  return ids.map((id) => {
    return getRecording(id + "")!;
  });
};

export const getSongs = () => {
  return goodSongs;
};

export const getSong = (id: string) => {
  for (const song of goodSongs) {
    if (song.linkid === Number(id)) return song;
  }
};

export interface GoodCommentInstance {
  type: string;
  linkid: number;
  comment: GoodComment;
}
const recordingsWithComment = goodRecordings.filter(
  ({ comments }) => comments.length > 0
);
const songsWithComment = goodSongs.filter(
  ({ comments }) => comments.length > 0
);
const commentInstances: GoodCommentInstance[] = [];
for (const recordingWithComment of recordingsWithComment) {
  recordingWithComment.comments.forEach((comment) => {
    commentInstances.push({
      type: "recordings",
      linkid: recordingWithComment.linkid,
      comment,
    });
  });
}
for (const songWithComment of songsWithComment) {
  songWithComment.comments.forEach((comment) => {
    commentInstances.push({
      type: "songs",
      linkid: songWithComment.linkid,
      comment,
    });
  });
}

export const getComments = () => {
  return commentInstances;
};

export const getRandomUrl = () => {
  const recordings = getRecordings();
  const songs = getSongs().filter(({ value }) => value !== "");
  const recordingsRandomNumber = getRandomNumber(0, recordings.length - 1);
  const songsRandomNumber = getRandomNumber(0, songs.length - 1);
  const randomRecordingsLinkId = recordings[recordingsRandomNumber].linkid;
  const randomSongsLinkId = songs[songsRandomNumber].linkid;
  if (getRandomNumber(0, 2) === 0)
    return `/recordings/${randomRecordingsLinkId}`;
  return `/songs/${randomSongsLinkId}`;
};
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
