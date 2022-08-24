export interface SongImport {
  linkid: number;
  value: string;
  comments?: any[];
}
export interface SongRImport {
  linkid: number;
  n: number;
}

export interface RecordingImport {
  linkid: number;
  type: string;
  venue?: string;
  country?: string;
  city?: string;
  quality?: string;
  year?: number;
  sublocation?: string;
  jon?: number;
  songs?: SongRImport[];
  comments: Comment[];
}

export interface Recording extends Omit<RecordingImport, "songs"> {
  songs: Song[];
}

export interface Song {
  linkid: number;
  value: string;
  comments: any[];
}

export interface Comment {
  name: string;
  text: string;
  time: string;
  bob?: number;
}

export interface Surrounding {
  prev?: string;
  next?: string;
}
