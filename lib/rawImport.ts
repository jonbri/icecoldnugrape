import recordingsData from "../data/recordings_raw.json";
import songsData from "../data/songs_raw.json";
import { GoodRecording } from "./recording";

interface RawRecording {
  linkid: number;
  type: string;
  venue?: string;
  country?: string;
  city?: string;
  quality?: string;
  year?: number;
  month?: number;
  date?: number;
  jon?: number;
  songs: any[];
  comments: any[];
  name?: string;
  sublocation?: string;
}
interface RawSong {
  linkid: number;
  value: string;
  comments: any[];
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

function numToMonth(num?: number) {
  if (num === undefined) return "";
  return months[num - 1];
}
function formatDate(year?: number, month?: number, date?: number) {
  let sFormattedDate = "";
  if (year !== undefined) sFormattedDate += year + " ";
  if (month !== undefined) sFormattedDate += numToMonth(month) + " ";
  if (date !== undefined) sFormattedDate += date + " ";
  return sFormattedDate;
}
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
}: RawRecording) => {
  let sFormattedRecording = "";

  // special label if it has type
  if (type === "Album") {
    return `${name} (${year})`.trim();
  } else if (type === "Studio Bootleg") {
    return `${name} (studio bootleg, ${year})`.trim();
  } else if (type === "Compilation") {
    return `${name} (compilation)`.trim();
  } else if (type === "Interview") {
    return `${name} (${year})`.trim();
  } else if (type === "TV") {
    return `${name} (${year})`.trim();
  } else if (type === "Radio") {
    return `${name} (${year})`.trim();
  } else if (type === "Single") {
    return `${name} (single, ${year})`.trim();
  }

  if (year || month || city)
    sFormattedRecording += formatDate(year, month, date);
  if (city) sFormattedRecording += city + " ";
  if (sublocation) sFormattedRecording += sublocation + " ";
  if (country) sFormattedRecording += country + " ";
  if (venue) sFormattedRecording += venue + " ";
  if (name) sFormattedRecording += name + " ";

  return sFormattedRecording.trim();
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

const generateGoodRecordings = () => {
  const goodRecordings: GoodRecording[] = [];
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

const goodSongs = generateGoodSongs();
const goodRecordings = generateGoodRecordings();
const payload = {
  goodRecordings,
  goodSongs,
};
export default payload;
