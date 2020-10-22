import React from "react";
import {Card} from 'antd';
import {HeartFilled, DislikeFilled} from '@ant-design/icons';

const Book = ({book}) => {
  if (!book) return null;
  return (
      <div className="Book">
          <a href={book.goodreads_link} target="_blank">
            <Card
                size="small"
                hoverable
                cover={
                  <img src={book.image} alt="Book cover"/>
                }
            >
              <Card.Meta
                  title={
                      <div>
                          <span className="Book-icon">
                              {book.best_of === 'TRUE' && <HeartFilled style={{color: '#c60000', marginRight: 5}} />}
                              {book.worst_of === 'TRUE' && <DislikeFilled style={{color: 'gray', marginRight: 5}} />}
                          </span>
                          {book.title}
                      </div>
                  }
                  description={
                    <>
                      {/*<div>{book.series}</div>*/}
                      <div>by {book.author}</div>
                      <div className="Book-year">{book.year_published}</div>
                    </>
                  }
              />
            </Card>
          </a>
      </div>
  );
};

export default Book;
