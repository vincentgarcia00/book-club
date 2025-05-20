import { useEffect, useState } from "react";
import { BookFilled, SoundFilled, ClockCircleFilled } from "@ant-design/icons";
import { searchAllLibraries, ILibraryResult } from "overdrive-api/overdrive";
import { useParams } from "wouter";
import { Alert, List } from "antd";

const pluralize = (count: number) => (count === 1 ? "" : "s");

const LibrarySearch = () => {
  const [searchResults, setSearchResult] = useState<ILibraryResult[]>([]);

  const params = useParams();
  const { title, author = "" } = params;

  useEffect(() => {
    if (!title) {
      return;
    }
    searchAllLibraries(title, author).then(setSearchResult);
  }, [title, author]);

  if (!title) {
    return <>Enter search query</>;
  }

  return (
    <List
      itemLayout="vertical"
      dataSource={searchResults}
      renderItem={(result) => (
        <List.Item key={result.id}>
          <List.Item.Meta
            avatar={<img src={result.coverUrl} alt={result.title + " Cover"} />}
            title={
              <div style={{ display: "flex" }}>
                <img
                  src={result.coverUrl}
                  alt={result.title + " Cover"}
                  style={{ marginRight: 5 }}
                  className="hideMd hideLg"
                />
                <div>
                  <div className="library-search-title">
                    {result.type === "eBook" && (
                      <BookFilled style={{ color: "#a0a0a0" }} />
                    )}
                    {result.type === "Audiobook" && (
                      <SoundFilled style={{ color: "#a0a0a0" }} />
                    )}
                    &nbsp;
                    {result.title}
                  </div>
                  <div className="library-search-author">{result.author}</div>
                </div>
              </div>
            }
            description={result.libraries.map((library) => {
              if (!library.isOwned) {
                return null;
              }
              return (
                <a key={library.name} href={library.libbyUrl} target="_blank">
                  <Alert
                    style={{ marginBottom: 10 }}
                    message={library.name}
                    description={
                      library.isAvailable
                        ? "Available Now"
                        : `Wait Time: ${library.waitTimeInDays} day${pluralize(
                            library.waitTimeInDays
                          )} | ${library.holdsCount} hold${pluralize(
                            library.holdsCount
                          )} on ${library.ownedCopies} cop${
                            library.ownedCopies === 1 ? "y" : "ies"
                          }`
                    }
                    type={library.isAvailable ? "success" : "warning"}
                    showIcon
                    icon={!library.isAvailable && <ClockCircleFilled />}
                  />
                </a>
              );
            })}
          />
        </List.Item>
      )}
    ></List>
  );
};

export default LibrarySearch;
