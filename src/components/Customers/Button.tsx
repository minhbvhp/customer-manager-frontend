import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";

export function CreateCustomer() {
  return (
    <Button type="primary">
      <Link href="/dashboard/customers/create">
        <span style={{ marginRight: 10 }}>Tạo mới</span> <PlusOutlined />
      </Link>
    </Button>
  );
}
