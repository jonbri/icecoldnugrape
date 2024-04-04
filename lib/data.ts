import payload from "./rawImport";
import { RecordingCommentInstance, SongCommentInstance } from "./types";
const { recordings, songs } = payload;

export const getRecordings = () => recordings;

export const getRecording = (id: string) => {
  for (const recording of recordings) {
    if (recording.linkid === Number(id)) return recording;
  }
};

export const idsToShows = (ids: number[]) =>
  ids.map((id) => getRecording(id + "")!);

export const getSongs = () =>
  songs.sort(({ name: name0 }, { name: name1 }) => {
    if (name0.toLowerCase() > name1.toLowerCase()) return 1;
    else if (name0.toLowerCase() < name1.toLowerCase()) return -1;
    return 0;
  });

export const getSongFromSanitized = (id: string) =>
  songs.find(({ sanitized }) => sanitized === id);

export const getSongFromName = (name: string) =>
  songs.find((song) => song.name === name);

const recordingsWithComment = recordings.filter(
  ({ comments }) => comments.length > 0
);
const songsWithComment = songs.filter(({ comments }) => comments.length > 0);
const recordingCommentInstances: RecordingCommentInstance[] = [];
for (const { linkid, comments } of recordingsWithComment) {
  comments.forEach((comment) => {
    recordingCommentInstances.push({
      type: "recordings",
      linkid,
      comment,
    });
  });
}

const songCommentInstances: SongCommentInstance[] = [];
for (const { name, comments } of songsWithComment) {
  comments.forEach((comment) => {
    songCommentInstances.push({
      type: "songs",
      song: name,
      comment,
    });
  });
}

export const getRecordingComments = () => recordingCommentInstances;
export const getSongComments = () => songCommentInstances;

export const getRandomUrl = () => {
  const recordings = getRecordings();
  const songs = getSongs();
  const recordingsRandomNumber = getRandomNumber(0, recordings.length - 1);
  const songsRandomNumber = getRandomNumber(0, songs.length - 1);
  const randomRecordingsLinkId = recordings[recordingsRandomNumber].linkid;
  const randomSongsLinkId = songs[songsRandomNumber].sanitized;
  if (getRandomNumber(0, 2) === 0) {
    return `/recordings/${randomRecordingsLinkId}`;
  }
  return `/songs/${randomSongsLinkId}`;
};
const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
