import { SongType } from "./raw";

export interface RecordingImport {
  id: number;
  type: string;
  venue?: string;
  country?: string;
  city?: string;
  quality?: string;
  year?: number;
  month?: number;
  date?: number;
  jon?: boolean;
  jonnote?: string;
  breaks?: number[];
  format?: string;
  songs: LinkedSongImport[];
  comments?: Comment[];
  name?: string;
  sublocation?: string;
  discogs?: string;
}
export interface Recording extends Omit<RecordingImport, "songs" | "comments"> {
  songs?: SongInstance[];
  comments: Comment[];
  formattedTitle: string;
  prev: number | null;
  next: number | null;
}

export interface SongImport {
  name: SongType;
  comments?: Comment[];
  set?: number; // -1 | 1 | 2 | 3
}
export interface Song extends SongImport {
  shows: number[];
  sanitized: string;
  comments: Comment[];
}
export interface SongInstance extends Song {
  n: number;
}
export interface LinkedSongImport extends Pick<SongInstance, "n" | "set"> {
  name: SongType;
}

export interface Comment {
  name: string;
  text: string;
  time: string;
  bob?: number;
}
export interface RecordingCommentInstance {
  type: string;
  id: number;
  comment: Comment;
}

export interface SongCommentInstance {
  type: string;
  song: SongType;
  comment: Comment;
}
