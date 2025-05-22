import { BookOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { useDarkMode } from "./DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div style={{ display: "flex", alignItems: "normal", justifyContent: "space-between" }}>
      <h1 style={{ fontSize: 20, padding: "10px 16px", lineHeight: "32px", margin: 0 }}>
        <span style={{ marginRight: 12 }}>
          <a style={{ color: "inherit", textDecoration: "inherit" }} href="/book-club"><BookOutlined /> Book Club</a>
        </span>
        <span className="header-subtitle subtitle-responsive">
          Alive and kicking since 2015
        </span>
      </h1>
      <div style={{ marginLeft: 16, marginRight: 16, paddingTop: 13.25 }}>
        <Switch checked={darkMode} onChange={toggleDarkMode} checkedChildren="🌙" unCheckedChildren="☀️" />
      </div>
    </div>
  );
};

export default Header;
