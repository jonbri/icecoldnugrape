// import recordingsData from "../data/recordings_raw.json";
// import songsData from "../data/songs_raw.json";

// import { goodRecordings, goodSongs } from "./rawImport";
import payload from "./rawImport";
const { goodRecordings, goodSongs } = payload;

export interface GoodComment {
  name: string;
  text: string;
  time: string;
  bob?: number;
}
export interface GoodCommentInstance {
  type: string;
  linkid: number;
  comment: GoodComment;
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

export const getRecordings = () => goodRecordings;

export const getRecording = (id: string) => {
  for (const recording of goodRecordings) {
    if (recording.linkid === Number(id)) return recording;
  }
};

export const idsToShows = (ids: number[]) =>
  ids.map((id) => getRecording(id + "")!);

export const getSongs = () => goodSongs;

export const getSong = (id: string) => {
  for (const song of goodSongs) {
    if (song.linkid === Number(id)) return song;
  }
};

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

export const getComments = () => commentInstances;

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
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
