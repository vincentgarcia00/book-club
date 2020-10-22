import React, { useEffect, useState } from 'react';
import './App.css';
import Book from "./components/Book";
import BookList from "./components/BookList";
import UpcomingBooks from "./components/UpcomingBooks";
import * as api from './api';
import {PageHeader, Row, Col, Divider} from 'antd';
import {PushpinOutlined, BookOutlined,DoubleRightOutlined} from '@ant-design/icons';

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

            <Divider orientation="left">
               <span style={{display: 'inline-flex', alignItems: 'center'}}>
                   <PushpinOutlined style={{marginRight: 5}} />
                   <span style={{fontSize: 24}}>Currently Reading</span>
               </span>
            </Divider>
            <Row className="BookList">
                <Col xs={12} sm={8} md={6} lg={4} className="BookList-item">
                    <div className="BookList-item-margin">
                        <Book book={currentlyReading} />
                    </div>
                </Col>
                <Col xs={12} sm={8} md={6} lg={4} className="BookList-item">
                    <div className="BookList-item-margin">
                        <UpcomingBooks books={upcoming} />
                    </div>
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
                <BookList books={booksInYear}/>
              </div>
             );
          })
        }
      </div>
  );
};

export default App;
