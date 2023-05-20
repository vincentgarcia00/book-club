export interface ISheetBestBook {
  year: string;
  title: string;
  author: string;
  series: string;
  best_of: boolean;
  worst_of: boolean;
  goodreads_link: string;
  image: string;
  picked_by?: string;
}

export interface ISheetBestBookStat {
  genre?: string;
  year_published: string;
  pages?: string;
}

export default interface IBook {
  year?: number;
  isCurrentlyReading: boolean;
  isUpcoming: boolean;
  title: string;
  author: string;
  series: string;
  best_of: boolean;
  worst_of: boolean;
  year_published: string;
  goodreads_link: string;
  image: string;
  genres: string[];
  picked_by?: string;
  pages?: number;
}

export interface ICacheConfig {
  last_updated: string;
}
