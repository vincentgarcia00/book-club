import { Card } from "antd";
import IBook from "../types/IBook";
import FavoriteIcon from "./FavoriteIcon";
import DislikeIcon from "./DislikeIcon";

interface IProps {
  book: IBook;
}

const BookDetailed = ({ book }: IProps) => {
  if (!book) return null;

  return (
    <div>
      <a href={book.goodreads_link} target="_blank">
        <div style={{ display: "flex" }}>
          <div>
            <img width={200} src={book.image} alt="Book cover" />
          </div>
          <div>
            <div>{book.author}</div>
            <div>{book.year}</div>
            {!!book.picked_by && <div>Picked by {book.picked_by}</div>}
          </div>
        </div>
      </a>
    </div>
  );
};

export default BookDetailed;
