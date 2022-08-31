import payload from "./rawImport";
const { recordings, songs } = payload;

export interface Comment {
  name: string;
  text: string;
  time: string;
}
export interface CommentInstance {
  type: string;
  linkid: number;
  comment: Comment;
}
export interface Song {
  linkid: number;
  value: string;
  comments: Comment[];
  shows: number[];
}
export interface SongInstance extends Song {
  n: number;
}
export interface Recording {
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
  jon?: boolean;
  songs?: SongInstance[];
  comments: Comment[];
  formattedTitle: string;
  prev: number | null;
  next: number | null;
  name?: string;
}

export const getRecordings = () => recordings;

export const getRecording = (id: string) => {
  for (const recording of recordings) {
    if (recording.linkid === Number(id)) return recording;
  }
};

export const idsToShows = (ids: number[]) =>
  ids.map((id) => getRecording(id + "")!);

export const getSongs = () =>
  songs.sort(({ value: value0 }, { value: value1 }) => {
    if (value0.toLowerCase() > value1.toLowerCase()) return 1;
    else if (value0.toLowerCase() < value1.toLowerCase()) return -1;
    return 0;
  });

export const getSong = (id: number) =>
  songs.find(({ linkid }) => linkid === id);

const recordingsWithComment = recordings.filter(
  ({ comments }) => comments.length > 0
);
const songsWithComment = songs.filter(({ comments }) => comments.length > 0);
const commentInstances: CommentInstance[] = [];
for (const recording of recordingsWithComment) {
  recording.comments.forEach((comment: Comment) => {
    commentInstances.push({
      type: "recordings",
      linkid: recording.linkid,
      comment,
    });
  });
}
for (const song of songsWithComment) {
  song.comments.forEach((comment: Comment) => {
    commentInstances.push({
      type: "songs",
      linkid: song.linkid,
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
