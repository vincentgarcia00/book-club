import { HeartFilled } from "@ant-design/icons";

const FavoriteIcon = ({ color = "gray" }: { color?: string }) => {
  return <HeartFilled style={{ color }} />;
};

export default FavoriteIcon;
