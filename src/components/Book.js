import React from "react";
import {Card, Icon, Tag} from 'antd';

const Book = ({book}) => {
  return (
      <div className="Book">
        <Card
            size="small"
            hoverable
            cover={
              <>
                <img src={book.image} alt="Book cover"/>
                <div className="Book-year">
                  <div className="Book-year-text">
                    {book.year_published}
                  </div>
                </div>
              </>
            }
        >
          <div className="Book-tags">
            {/*    <div><Tag>{book.genre}</Tag></div>*/}
            {/*    <div><Tag>{book.international ? 'Non-US ' : ''}{book.ethnicity} {book.gender}</Tag></div>*/}
          </div>
          <Card.Meta
              title={book.title}
              description={
                <>
                  <div>{book.series}</div>
                  <div>by {book.author}</div>
                </>
              }
          />
        </Card>
      </div>
  );
};

export default Book;
