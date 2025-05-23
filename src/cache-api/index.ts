import IBook from "types/IBook";
import { ICacheBook, ICacheBookStat } from "./ICacheBook";

const isDevEnv = process.env.NODE_ENV === "development";
const cachePrefix = isDevEnv ? "book-club/cache" : "cache";

const getFromCache = (url: string) => {
  console.log("Load from cache", url);
  return fetch(`${cachePrefix}/${url}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    try {
      return response.json();
    } catch (e) {
      console.log(e);
    }
  });
};

const getBookList = (): Promise<ICacheBook[]> => getFromCache("books.json");

const getBookStats = (): Promise<ICacheBookStat[]> =>
  getFromCache("stats.json");

// const getReaderStats = () => getFromCache("readerStats.json");

// export const getLibraries = (): Promise<ILibrary[]> =>
//   getFromCache("libraries.json");

export const getCacheConfig = () => getFromCache("config.json");

export const getBooks = (): Promise<IBook[]> => {
  return Promise.all([getBookList(), getBookStats()]).then(processResults);
};

const processResults = (results: [ICacheBook[], ICacheBookStat[]]): IBook[] => {
  const [books, stats] = results;

  return books
    .map(
      (book: ICacheBook, idx: number) =>
        ({
          ...book,
          id: book.title.replace(/ /g, "_").toLowerCase(),
          isCurrentlyReading: book.year === "Currently Reading",
          isUpcoming: book.year === "Upcoming",
          year: Number(book.year),

          ...stats[idx],
          genres: stats[idx].genre?.split("|") ?? [],
        } as IBook)
    )
    .reverse();
};
