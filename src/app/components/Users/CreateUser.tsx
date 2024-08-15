import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function CreateUser() {
  return (
    <Link href="/dashboard/admin/create-user">
      <Button type="primary">
        Tạo mới <PlusOutlined />{" "}
      </Button>
    </Link>
  );
}
