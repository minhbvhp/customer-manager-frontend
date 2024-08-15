import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function CreateCustomer() {
  return (
    <Link href="/dashboard/customers/create">
      <Button type="primary">
        Tạo mới <PlusOutlined />{" "}
      </Button>
    </Link>
  );
}
