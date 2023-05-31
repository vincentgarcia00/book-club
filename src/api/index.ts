import IBook, { IApiBook, IApiBookStat } from "../types/IBook";

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

const getBookList = (): Promise<IApiBook[]> => getFromCache("books.json");

const getBookStats = (): Promise<IApiBookStat[]> => getFromCache("stats.json");

const getReaderStats = () => getFromCache("readerStats.json");

export const getCacheConfig = () => {
  return getFromCache("/config.json");
};

export const getBooks = (): Promise<IBook[]> => {
  return Promise.all([getBookList(), getBookStats()]).then(processResults);
};

const processResults = (results: [IApiBook[], IApiBookStat[]]): IBook[] => {
  const [books, stats] = results;

  return books
    .map(
      (book: IApiBook, idx: number) =>
        ({
          ...book,
          isCurrentlyReading: book.year === "Currently Reading",
          isUpcoming: book.year === "Upcoming",
          year: Number(book.year),

          ...stats[idx],
          genres: stats[idx].genre?.split("|") ?? [],
        } as IBook)
    )
    .reverse();
};
