import "antd/dist/reset.css";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CacheInfo from "./cache/CacheInfo";
import BookHistoryPage from "./book-history/BookHistoryPage";
import LibrarySearch from "library-search/LibrarySearch";
import { Router, Route, Link, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Bylaws from "bylaws/Bylaws";
import BookDetailPage from "./book-detail/BookDetailPage";
import { useEffect, useState } from "react";
import IBook from "types/IBook";
import * as api from "cache-api";
import { DarkModeProvider } from "./components/DarkModeContext";

const App = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    api.getBooks().then(setBooks).catch(setError);
  }, []);

  if (error) {
    console.error(error);
    return <>There was an error</>;
  }

  return (
    <DarkModeProvider>
      <Router hook={useHashLocation}>
        <div className="App">
          <Layout.Header>
            <Header />
          </Layout.Header>

          <Switch>
            <Route path="/">
              <BookHistoryPage books={books} />
            </Route>

            <Route path="/book/:id">
              {(params) => {
                var book = books.find((b) => b.id === params.id);
                if (!book) return <div>Book not found</div>;
                return <BookDetailPage book={book} />;
              }}
            </Route>

            <Route path="/search/:title/:author" component={LibrarySearch} />

            <Route path="/bylaws" component={Bylaws} />
          </Switch>

          <Layout.Footer style={{ textAlign: "center" }}>
            <div>
              <a href="/book-club">Home</a> | <Link href="/bylaws">Bylaws</Link>
            </div>
            <CacheInfo />
          </Layout.Footer>
        </div>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
