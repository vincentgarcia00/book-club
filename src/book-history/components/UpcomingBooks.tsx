import { Drawer, Button, Row } from "antd";
import BookList from "./BookList";
import { CalendarOutlined, FrownOutlined } from "@ant-design/icons";
import { useState } from "react";
import IBook from "types/IBook";

interface IProps {
  books: IBook[];
}

const UpcomingBooks = ({ books }: IProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <h4 style={{ marginLeft: "5px", marginBottom: "0" }}>
        <CalendarOutlined style={{ marginRight: 5 }} />
        Upcoming
        <Button
          type="link"
          onClick={() => setVisible(true)}
          style={{
            padding: "0",
            paddingLeft: "15px",
            lineHeight: "inherit",
            height: "inherit",
            fontSize: "12px",
          }}
        >
          {books.length ? `View All (${books.length})` : null}
        </Button>
      </h4>
      {books.length ? null : (
        <div style={{ padding: 10 }}>
          No upcoming books <FrownOutlined />
        </div>
      )}
      <Drawer
        title={`Upcoming Books (${books.length})`}
        placement="bottom"
        closable
        onClose={() => setVisible(false)}
        open={visible}
        height={515}
      >
        <Row>
          <BookList books={books} />
        </Row>
      </Drawer>
    </div>
  );
};

export default UpcomingBooks;
