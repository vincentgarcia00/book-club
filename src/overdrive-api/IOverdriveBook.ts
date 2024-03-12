import ILibrary from "cache-api/ILibrary";

export interface IOverdriveBook {
  id: string;
  isAvailable: boolean;
  availableCopies: number;
  ownedCopies: number;
  isOwned: boolean;
  holdsCount: number;
  estimatedWaitDays: number;
  type: {
    id: string; // audiobook, ebook
    name: string; // Audiobook, eBook
  };
  covers: {
    cover150Wide: IOverdriveBookCover;
    cover300Wide: IOverdriveBookCover;
    cover510Wide: IOverdriveBookCover;
  };
  title: string;
  subtitle?: string;
  firstCreatorName: string;
  formats: [
    {
      duration: string;
    }
  ];
  detailedSeries: {
    seriesId: number;
    seriesName: string;
    rank: number;
  };
  languages: [
    {
      id: string;
      name: string;
    }
  ];
  library: ILibrary;
}

export interface IOverdriveSearchResult {
  items: IOverdriveBook[];
  totalItems: number;
}

interface IOverdriveBookCover {
  href: string;
  height: number;
  width: number;
  isPlaceholderImage: boolean;
}
