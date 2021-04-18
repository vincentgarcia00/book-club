import React, { useEffect, useState } from 'react';
import './App.css';
import Book from "./components/Book";
import BookList from "./components/BookList";
import UpcomingBooks from "./components/UpcomingBooks";
import * as api from './api';
import {PageHeader, Row, Col, Divider, Button} from 'antd';
import {BookOutlined, CalendarOutlined, DoubleRightOutlined, PushpinOutlined} from '@ant-design/icons';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.getBooks().then(setBooks);
  }, []);

  const recentBooks = books.reverse();
  const years = [...new Set(books.map(b => b.year))].filter(y => !isNaN(y));

  const currentlyReading = books.find(b => b.year === 'Currently Reading');
  const upcoming = books.filter(b => b.year === 'Upcoming').reverse();

  return (
      <div className="App">
        <PageHeader
            title={<><BookOutlined />  Book Club</>}
            subTitle="Alive and kicking since 2015"/>
          <h2 style={{marginLeft: '5px', marginBottom: '0'}}>
              <PushpinOutlined style={{marginRight: 5}} />Reading Now
          </h2>
            <Row className="BookList">

                <BookList books={[currentlyReading]} className="BookList-item-current"/>

                <Col xs={12} sm={16} md={18} lg={20}>
                    <UpcomingBooks books={upcoming} />
                    <Row className="upcoming-books">
                        {upcoming.map((book, idx) => {
                            const hideXs = idx > 0, hideSm = idx > 1, hideMd = idx > 3, hideLg = idx > 5;
                            return (
                                <Col key={idx} xs={22} sm={10} md={6} lg={4}
                                     className={`BookList-item BookList-item-current ${hideXs ? 'hideXs' : ''} ${hideSm ? 'hideSm' : ''} ${hideMd ? 'hideMd' : ''} ${hideLg ? 'hideLg' : ''}`}>
                                    <div className="BookList-item-margin">
                                        <Book book={book} key={idx}/>
                                    </div>
                                </Col>
                            )}
                        )}
                    </Row>
                </Col>
            </Row>

        {
          years.map((year, idx) => {
             const booksInYear = recentBooks.filter(b => b.year === year);
             return (
                 <div key={idx}>
                     <Divider orientation="left">
                       <span style={{display: 'inline-flex', alignItems: 'center'}}>
                           <DoubleRightOutlined style={{marginRight: 5}} />
                           <span style={{fontSize: 24}}>{year}</span>
                       </span>
                       <span style={{fontSize: 14, color: 'gray', fontWeight: 'normal', marginLeft: 10}}>{booksInYear.length} Books</span>
                     </Divider>
                     <Row className="BookList">
                        <BookList books={booksInYear}/>
                     </Row>
                </div>
             );
          })
        }
      </div>
  );
};

export default App;
