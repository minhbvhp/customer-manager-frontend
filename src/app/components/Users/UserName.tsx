import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Avatar } from "antd";

export default function UserName({ userName }: { userName: string }) {
  return (
    <Link href="/" style={{ fontWeight: "bold", color: "#3C5B6F" }}>
      {userName}
      <Avatar
        style={{ backgroundColor: "#8E3E63", margin: 8 }}
        icon={<UserOutlined />}
      />
    </Link>
  );
}
