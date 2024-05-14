import { SongType } from "./raw";

type RecordingType =
  | "Album"
  | "Studio Bootleg"
  | "Show"
  | "Compilation"
  | "Single"
  | "Radio"
  | "Interview"
  | "TV";

type Country =
  | "USA"
  | "Netherlands"
  | "Belgium"
  | "UK"
  | "Sweden"
  | "France"
  | "Australia"
  | "Canada"
  | "Finland"
  | "Spain"
  | "Germany"
  | "Italy"
  | "Denmark"
  | "Japan"
  | "Austria"
  | "Scotland";

type Quality =
  | "Good"
  | "Very Good"
  | "Poor"
  | "Excellent"
  | "Poor/Good"
  | "Good/Very Good"
  | "Fair";

type Format = "flac" | "mp3" | "wav" | "m4a" | "aiff" | "aac" | "wma";

type Year =
  | 1971
  | 1972
  | 1973
  | 1974
  | 1975
  | 1976
  | 1977
  | 1978
  | 1979
  | 1980
  | 1981
  | 1982
  | 1983
  | 1984
  | 1985
  | 1986
  | 1987
  | 1988
  | 1989
  | 1990
  | 1991
  | 1992
  | 1993
  | 1994
  | 1995
  | 1996
  | 1997
  | 1998
  | 1999
  | 2000
  | 2001
  | 2002
  | 2003
  | 2004
  | 2005
  | 2006
  | 2007
  | 2008
  | 2009
  | 2010
  | 2011
  | 2012
  | 2013
  | 2014
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024;
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Date =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export interface RecordingImport {
  id: number;
  type: RecordingType;
  venue?: string;
  country?: Country;
  city?: string;
  quality?: Quality;
  year?: Year;
  month?: Month;
  date?: Date;
  jb?: boolean;
  jbnote?: string;
  format?: Format;
  songs: LinkedSongImport[];
  comments?: Comment[];
  name?: string;
  sublocation?: string;
  discogs?: string;
  bandcamp?: string;
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
