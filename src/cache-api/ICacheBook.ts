export interface ICacheBook {
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

export interface ICacheBookStat {
  genre?: string;
  year_published: number;
  pages?: number;
}
