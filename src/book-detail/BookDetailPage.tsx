import { Space, Typography, Button } from "antd";
import IBook from "types/IBook";
import Book from "book-history/components/Book";
import { Link } from "wouter";
import { ReadOutlined } from "@ant-design/icons";
import LibbyIcon from "book-history/components/LibbyIcon";

interface IProps {
  book: IBook;
}

const BookDetailPage = ({ book }: IProps) => {
  return (
    <div style={{ display: "flex", padding: "0 15px" }}>
      <Space align="start" size="large">
        <div style={{ maxWidth: 300 }}>
          <Book book={book} />
        </div>
        <div>
          <div>
            <Typography.Title level={2} className="book-detail-title">
              {book.title}
              <Typography.Text type="secondary" className="book-detail-author">
                <div>by {book.author}</div>
              </Typography.Text>
              {!!book.series && (
                  <Typography.Text type="secondary" className="book-detail-author">
                    <div>{book.series}</div>
                  </Typography.Text>
              )}
            </Typography.Title>
          </div>
          <div>Picked by {book.picked_by}</div>
          <div style={{ marginTop: 15 }}>
            <Space>
              <Link
                href={`/search/${book.title}/${book.author
                  .split(" ")
                  .slice(-1)}`}
              >
                <Button icon={<LibbyIcon />}>Find on Libby</Button>
              </Link>
              <a href={book.goodreads_link} target="_blank">
                <Button icon={<ReadOutlined />}>Goodreads</Button>
              </a>
              {/* <a href={book.audible_link}>Audible</a> */}
            </Space>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default BookDetailPage;
