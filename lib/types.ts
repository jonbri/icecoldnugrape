export interface RecordingImport {
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
  jonnote?: string;
  breaks?: number[];
  format?: string;
  songs: LinkedSongImport[];
  comments: Comment[];
  name?: string;
  sublocation?: string;
}
export interface Recording extends Omit<RecordingImport, "songs" | "comments"> {
  songs?: SongInstance[];
  comments: Comment[];
  formattedTitle: string;
  prev: number | null;
  next: number | null;
}

export interface SongImport {
  linkid: number;
  value: string;
  comments: Comment[];
  set?: number; // -1 | 1 | 2 | 3
}
export interface Song extends SongImport {
  shows: number[];
}
export interface SongInstance extends Song {
  n: number;
}
export interface LinkedSongImport
  extends Pick<SongInstance, "linkid" | "n" | "set"> {}

export interface Comment {
  name: string;
  text: string;
  time: string;
  bob?: number;
}
export interface CommentInstance {
  type: string;
  linkid: number;
  comment: Comment;
}
