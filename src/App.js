import React from 'react';
import './App.css';
import BookList from "./components/BookList";
import books from './data.json';
import {Typography} from 'antd';

const getYears = books => {
  return [...new Set(books.map(b => b.year))];
};

function App() {
  const recentBooks = books.reverse();
  const years = getYears(recentBooks);

  return (
      <div className="App">
        {
          years.map((year, idx) =>
              <div key={idx}>
                <Typography.Title level={2} className="BookGroup">{year}</Typography.Title>
                <BookList books={recentBooks.filter(b => b.year === year)}/>
              </div>
          )}
      </div>
  );
}

export default App;
