import { SongType } from "@/raw";
import payload from "@/rawImport";
import { RecordingCommentInstance, SongCommentInstance } from "@/types";

const { recordings, songs } = payload;

export const getRecordings = () => recordings;

export const getRecording = (id: string) => {
  for (const recording of recordings) {
    if (recording.id === Number(id)) return recording;
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

export const getSongFromSanitized = (s: string) =>
  songs.find(({ sanitized }) => sanitized === s);

export const getSongFromName = (name: SongType) =>
  songs.find((song) => song.name === name);

const recordingsWithComment = recordings.filter(
  ({ comments }) => comments.length > 0,
);
const songsWithComment = songs.filter(({ comments }) => comments.length > 0);
const recordingCommentInstances: RecordingCommentInstance[] = [];
for (const { id, comments } of recordingsWithComment) {
  comments.forEach((comment) => {
    recordingCommentInstances.push({
      type: "recordings",
      id,
      comment,
    });
  });
}

const songCommentInstances: SongCommentInstance[] = [];
for (const { name: song, comments } of songsWithComment) {
  comments.forEach((comment) => {
    songCommentInstances.push({
      type: "songs",
      song,
      comment,
    });
  });
}

export const getRecordingComments = () => recordingCommentInstances;
export const getSongComments = () => songCommentInstances;

const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const getRandomRecording = () => {
  const recordings = getRecordings();
  const random = getRandomNumber(0, recordings.length - 1);
  return `/recordings/${recordings[random].id}`;
};

const getRandomSong = () => {
  const songs = getSongs();
  const random = getRandomNumber(0, songs.length - 1);
  return `/songs/${songs[random].sanitized}`;
};

export const getRandomUrl = () =>
  getRandomNumber(0, 2) === 0 ? getRandomRecording() : getRandomSong();
