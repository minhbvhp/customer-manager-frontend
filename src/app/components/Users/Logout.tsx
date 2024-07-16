import { logOut } from "@/app/lib/actions";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const logOutHandle = async () => {
    const result = await logOut();
    router.push("/login");
  };

  return (
    <Button type="primary" icon={<LogoutOutlined />} onClick={logOutHandle} />
  );
}
