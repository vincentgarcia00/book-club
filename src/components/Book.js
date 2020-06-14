import React from "react";
import {Card, Icon} from 'antd';

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
                              {book.best_of === 'TRUE' && <Icon style={{color: '#c60000', marginRight: 5}} type="heart" theme="filled" />}
                              {book.worst_of === 'TRUE' && <Icon style={{color: 'gray', marginRight: 5}} type="dislike" theme="filled" />}
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
