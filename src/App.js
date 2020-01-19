import React, { useEffect, useState } from 'react';
import './App.css';
import BookList from "./components/BookList";
import UpcomingBooks from "./components/UpcomingBooks";
import * as api from './api';
import {Typography, Affix, Icon} from 'antd';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.getBooks().then(setBooks);
  }, []);

  const recentBooks = books.reverse();
  const years = [...new Set(books.map(b => b.year))].filter(y => !isNaN(y));

  const currentlyReading = books.filter(b => b.year === 'Currently Reading');
  const upcoming = books.filter(b => b.year === 'Upcoming').reverse();

  return (
      <div className="App">
        <Typography.Title><Icon type="book" /> Book Club</Typography.Title>

        <Typography.Title level={2} className="BookGroup">
          <Icon type="pushpin" /> Currently Reading
        </Typography.Title>
        <BookList books={currentlyReading} />
        <UpcomingBooks books={upcoming} />

        {
          years.map((year, idx) =>
              <div key={idx}>
                <Affix><Typography.Title level={2} className="BookGroup BookGroup-year">{year}</Typography.Title></Affix>
                <BookList books={recentBooks.filter(b => b.year === year)}/>
              </div>
          )}
      </div>
  );
};

export default App;
