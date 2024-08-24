import "antd/dist/reset.css";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CacheInfo from "./cache/CacheInfo";
import BookHistoryPage from "./book-history/BookHistoryPage";
import LibrarySearch from "library-search/LibrarySearch";
import { Router, Route } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Bylaws from "bylaws/Bylaws";

const App = () => {
  return (
    <Router hook={useHashLocation}>
      <div className="App">
        <Layout.Header>
          <Header />
        </Layout.Header>

        <Route path="/" component={BookHistoryPage} />

        <Route path="/search/:title/:author" component={LibrarySearch} />

        <Route path="/bylaws" component={Bylaws} />

        <Layout.Footer style={{ textAlign: "center" }}>
          <div><a href="/book-club">Home</a> | <a href="/book-club/#/bylaws">Bylaws</a></div>
          <CacheInfo />
        </Layout.Footer>
      </div>
    </Router>
  );
};

export default App;
