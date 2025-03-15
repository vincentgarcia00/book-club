import { Badge } from "antd";
import IBook from "types/IBook";
import FavoriteIcon from "./FavoriteIcon";
import DislikeIcon from "./DislikeIcon";
import { Link } from "wouter";

interface IProps {
  book: IBook;
}

const Book = ({ book }: IProps) => {
  if (!book) return null;

  const content = (
    <div className="Book">
      <Link href={`/book/${book.id}`}>
        <div className="ant-card">
          <img src={book.image} alt="Book cover" />
        </div>
      </Link>
    </div>
  );

  if (book.best_of) {
    return (
      <Badge.Ribbon text={<FavoriteIcon />} color="#c60000">
        {content}
      </Badge.Ribbon>
    );
  }
  if (book.worst_of) {
    return (
      <Badge.Ribbon text={<DislikeIcon />} color="#ccc">
        {content}
      </Badge.Ribbon>
    );
  }

  return content;
};

export default Book;
