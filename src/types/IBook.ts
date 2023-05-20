export interface ISheetBestBook {
  year: string;
  title: string;
  author: string;
  series: string;
  best_of: boolean;
  worst_of: boolean;
  year_published: string;
  goodreads_link: string;
  image: string;
  genre?: string;
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
  recommended_by?: string;
}

export interface ICacheConfig {
  last_updated: string;
}
