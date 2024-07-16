import { Avatar } from "antd";

export default function UserIcon({ userName }: { userName: string }) {
  return (
    <Avatar style={{ verticalAlign: "middle" }} size="large">
      {userName}
    </Avatar>
  );
}
