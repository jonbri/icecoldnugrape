import { recordings as recordingsData, songs as songsData } from "../data/raw";
import {
  RecordingImport,
  Recording,
  SongImport,
  Song,
  SongInstance,
} from "./types";

const months = [
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
];

const numToMonth = (num?: number) => (num === undefined ? "" : months[num - 1]);
const formatDate = (year?: number, month?: number, date?: number) => {
  let formatted = "";
  if (year !== undefined && year !== 0) formatted += `${year} `;
  if (month !== undefined && month !== 0) formatted += `${numToMonth(month)} `;
  if (date !== undefined && date !== 0) formatted += `${date} `;
  return formatted;
};
const deriveFormattedTitle = ({
  type,
  name,
  year,
  month,
  date,
  city,
  sublocation,
  country,
  venue,
}: RecordingImport) => {
  let formatted = "";
  switch (type) {
    case "Show":
      formatted = formatDate(year, month, date);
      if (city) formatted += `${city} `;
      if (sublocation) formatted += `${sublocation} `;
      if (country) formatted += `${country} `;
      if (venue) formatted += `${venue} `;
      if (name) formatted += `${name} `;
      break;
    case "Compilation":
      formatted = name!;
      break;
    case "Album":
    case "Studio Bootleg":
      formatted = `${name} (${year})`;
      break;
    case "Radio":
      formatted = formatDate(year, month, date);
      if (city) formatted += `${city} `;
      if (sublocation) formatted += `${sublocation} `;
      if (country) formatted += `${country} `;
      if (venue) formatted += `${venue} `;
      if (name) formatted += `${name} `;
      if (!/radio/i.test(name ?? "")) {
        formatted += " (Radio)";
      }
      break;
    case "Interview":
    case "TV":
    case "Single":
    default:
      formatted = `${name} (${year})`;
      break;
  }
  return formatted.trim();
};

const aggregateSongs = (): Song[] =>
  songsData.map((rawSong) => ({
    ...rawSong,
    shows: recordingsData
      .filter(({ songs }) =>
        songs.map(({ name }) => name).includes(rawSong.value)
      )
      .map(({ linkid }) => linkid),
  }));

const getNextRecordingOfSameType = (position: number) => {
  const { type } = recordingsData[position];
  for (let i = position + 1; i < recordingsData.length; i++) {
    if (recordingsData[i].type === type) return recordingsData[i].linkid;
  }
  return null;
};

const getPreviousRecordingOfSameType = (position: number) => {
  const { type } = recordingsData[position];
  for (let i = position - 1; i >= 0; i--) {
    if (recordingsData[i].type === type) return recordingsData[i].linkid;
  }
  return null;
};

const aggregateRecordings = () => {
  const recordings: Recording[] = [];
  const { length } = recordingsData;
  for (let i = 0; i < length; i++) {
    const rawRecording = recordingsData[i] as RecordingImport;
    recordings.push({
      ...rawRecording,
      songs: rawRecording.songs.map(({ name, n, set = -1 }) => ({
        ...songs.find(({ value }) => value === name)!,
        n,
        set,
      })),
      next: getNextRecordingOfSameType(i),
      prev: getPreviousRecordingOfSameType(i),
      formattedTitle: deriveFormattedTitle(rawRecording),
    });
  }
  return recordings;
};

const songs: Song[] = aggregateSongs();
const recordings: Recording[] = aggregateRecordings();
const payload = {
  recordings,
  songs,
};
export default payload;
