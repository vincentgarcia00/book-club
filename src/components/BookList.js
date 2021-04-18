import React from 'react';
import {Col} from 'antd';
import Book from './Book';

const BookList = ({books, className = ''}) => {
  return (
    books.map((book, idx) =>
        <Col key={idx} xs={12} sm={8} md={6} lg={4} className={`BookList-item ${className}`} >
          <div className="BookList-item-margin">
            <Book book={book} key={idx}/>
          </div>
        </Col>
    )
  );
};

export default BookList;
