import React from 'react';
import {Row, Col} from 'antd';
import Book from './Book';

const BookList = ({books}) => {
  return (
      <Row className="BookList">
        {books.map((book, idx) =>
            <Col xs={12} sm={8} md={6} lg={4} className="BookList-item">
              <div className="BookList-item-margin">
                <Book book={book} key={idx}/>
              </div>
            </Col>
        )}
      </Row>
  )
};

export default BookList;
