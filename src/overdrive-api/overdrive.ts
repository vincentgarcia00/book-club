import { IOverdriveBook, IOverdriveSearchResult } from "./IOverdriveBook";
import ILibrary from "cache-api/ILibrary";

const OVERDRIVE_BASE_URL = "https://thunder.api.overdrive.com/v2";
//"https://thunder.api.overdrive.com/v2/libraries/plano/media?query=grace of kings&format=ebook-kindle,ebook-overdrive,ebook-epub-adobe,ebook-pdf-adobe,ebook-kobo,audiobook-overdrive,audiobook-mp3,magazine-overdrive&page=1&perPage=20"

const get = (url: string) => {
  return fetch(`${OVERDRIVE_BASE_URL}/${url}`).then((response) => {
    if (!response.ok) {
      console.error(response);
      throw new Error(response.statusText);
    }
    try {
      return response.json();
    } catch (e) {
      console.log(e);
    }
  });
};

// const formats = {
//   book: "ebook-kindle,ebook-overdrive,ebook-epub-adobe,ebook-pdf-adobe,ebook-kobo",
//   audiobook: "audiobook-overdrive,audiobook-mp3",
// };

export const search = (
  libraryName: string,
  searchQuery: string,
  all: boolean = false
): Promise<IOverdriveSearchResult> => {
  return get(
    `libraries/${libraryName}/media?query=${searchQuery}&format=ebook-kindle,ebook-overdrive,audiobook-overdrive,audiobook-mp3&page=1&perPage=4${
      all ? "&show=all" : ""
    }`
  );
};

var libraries = [
  {
    name: "Dallas Public Library",
    key: "dallaslibrary",
    websiteId: 441,
  },
  {
    name: "Frisco Public Library",
    key: "frisco",
    websiteId: 313,
  },
  {
    name: "Plano Public Library",
    key: "plano",
    websiteId: 310,
  },
  {
    name: "Richardson Public Library",
    key: "richardson",
    websiteId: 556,
  },
  {
    name: "Harris County Public Library",
    key: "hcpl",
    websiteId: 151,
  },
];

export const searchAllLibraries = async function (
  title: string,
  author: string
) {
  var tasks = libraries.map((l, idx) =>
    search(l.key, title + " " + author, idx === 0)
  );
  var results = await Promise.all(tasks);
  return processResults(libraries, results, decodeURIComponent(title));
};

const processResults = (
  libraries: ILibrary[],
  results: IOverdriveSearchResult[],
  title: string
): ILibraryResult[] => {
  var x = results
    .flatMap((r, idx) =>
      r.items.map((x) => ({
        ...x,
        library: libraries[idx],
      }))
    )
    .filter((result) =>
      result.languages.find((language) => language.id === "en")
    )
    .filter((result) => {
      console.log(sanitizeTitle(result.title), sanitizeTitle(title));
      return sanitizeTitle(result.title).startsWith(sanitizeTitle(title));
    })
    .reduce((acc, result, idx) => {
      var existing = acc[result.id];
      if (existing) {
        return {
          ...acc,
          [result.id]: {
            ...existing,
            libraries: [...existing.libraries, mapLibrary(result)],
          },
        } as IGroupByBookId;
      }
      return {
        ...acc,
        [result.id]: {
          id: result.id,
          sort: idx,
          title: result.title,
          author: result.firstCreatorName,
          coverUrl:
            result.covers.cover150Wide?.href ??
            result.covers.cover300Wide?.href,
          type: result.type.name,
          libraries: [mapLibrary(result)],
        },
      } as IGroupByBookId;
    }, {} as IGroupByBookId);
  return Object.values(x)
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 5);
};

const sanitizeTitle = (title: string) =>
  title.toLowerCase().replace("the ", "").replace(/\W/g, "");

const buildLibbyUrl = (library: ILibrary, bookId: string) =>
  `https://libbyapp.com/search/${library.key}/search/page-1/${bookId}`;

const mapLibrary = (result: IOverdriveBook) => ({
  name: result.library.name,
  isOwned: result.isOwned,
  isAvailable: result.isAvailable,
  waitTimeInDays: result.estimatedWaitDays,
  ownedCopies: result.ownedCopies,
  holdsCount: result.holdsCount,
  libbyUrl: buildLibbyUrl(result.library, result.id),
});

export interface ILibraryResult {
  id: string;
  title: string;
  author: string;
  libraries: [
    {
      name: string;
      isOwned: boolean;
      isAvailable: boolean;
      libbyUrl: string;
      waitTimeInDays: number;
      ownedCopies: number;
      holdsCount: number;
    }
  ];
  coverUrl: string;
  sort: number;
  type: string;
}

interface IGroupByBookId {
  [key: string]: ILibraryResult;
}
