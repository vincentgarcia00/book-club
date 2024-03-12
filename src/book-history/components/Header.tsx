import { BookOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <h1 style={{ fontSize: 20, padding: "10px 16px", lineHeight: "32px" }}>
      <span style={{ marginRight: 12 }}>
        <BookOutlined /> Book Club
      </span>
      <span style={{ color: "rgba(0,0,0,.45)", fontSize: 14 }}>
        Alive and kicking since 2015
      </span>
    </h1>
  );
};

export default Header;
