import "antd/dist/reset.css";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header";
import CacheInfo from "./cache/CacheInfo";
import BookHistoryPage from "./book-history/BookHistoryPage";
import LibrarySearch from "library-search/LibrarySearch";
import { Route, Switch } from "wouter";

const App = () => {
  return (
    <div className="App">
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Switch>
        <Route path="/" component={BookHistoryPage} />

        <Route path="/search/:title/:author" component={LibrarySearch} />
      </Switch>

      <Layout.Footer style={{ textAlign: "center" }}>
        <CacheInfo />
      </Layout.Footer>
    </div>
  );
};

export default App;
