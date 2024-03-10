export interface IApiBook {
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

export interface IApiBookStat {
  genre?: string;
  year_published: number;
  pages?: number;
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
  year_published: number;
  goodreads_link: string;
  libby_link: string;
  image: string;
  genres: string[];
  picked_by?: string;
  pages?: number;
}

export interface ICacheConfig {
  last_updated: string;
}
