import "antd/dist/reset.css";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CacheInfo from "./cache/CacheInfo";
import BookHistoryPage from "./book-history/BookHistoryPage";
import LibrarySearch from "library-search/LibrarySearch";
import { Router, Route } from "wouter";

const App = () => {
  return (
    <Router base="/book-club">
      <div className="App">
        <Layout.Header>
          <Header />
        </Layout.Header>

        <Route path="/" component={BookHistoryPage} />

        <Route path="/search/:title/:author" component={LibrarySearch} />

        <Layout.Footer style={{ textAlign: "center" }}>
          <CacheInfo />
        </Layout.Footer>
      </div>
    </Router>
  );
};

export default App;
