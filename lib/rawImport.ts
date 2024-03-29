import recordingsData from "../data/recordings_raw.json";
import songsData from "../data/songs_raw.json";
import { Recording, Song } from "./data";

interface RecordingImport {
  linkid: number;
  type: string;
  venue?: string;
  country?: string;
  city?: string;
  quality?: string;
  year?: number;
  month?: number;
  date?: number;
  jon?: boolean;
  songs: {
    linkid: number;
    n: number;
  }[];
  comments: {
    name: string;
    text: string;
    time: string;
    bob?: number;
  }[];
  name?: string;
  sublocation?: string;
}

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
  if (year !== undefined) formatted += `${year} `;
  if (month !== undefined) formatted += `${numToMonth(month)} `;
  if (date !== undefined) formatted += `${date} `;
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
    case "Interview":
    case "TV":
    case "Radio":
    case "Single":
    default:
      formatted = `${name} (${year})`;
      break;
  }
  return formatted.trim();
};

const aggregateSongs = () =>
  songsData.map((rawSong) => ({
    ...rawSong,
    shows: recordingsData
      .filter(({ songs }) =>
        songs.map(({ linkid }) => linkid).includes(rawSong.linkid)
      )
      .map(({ linkid }) => linkid),
  }));

const aggregateRecordings = () => {
  const recordings: Recording[] = [];
  const { length } = recordingsData;
  for (let i = 0; i < length; i++) {
    const rawRecording = recordingsData[i];
    const prev = i > 0 ? recordingsData[i - 1]?.linkid : null;
    const next = i < length - 1 ? recordingsData[i + 1]?.linkid : null;
    recordings.push({
      ...rawRecording,
      songs: rawRecording.songs.map(({ linkid, n }) => ({
        ...songs.find(({ linkid: songLinkid }) => songLinkid === linkid)!,
        n,
      })),
      next,
      prev,
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
