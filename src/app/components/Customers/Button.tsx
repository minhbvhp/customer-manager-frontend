import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export function CreateCustomer() {
  return (
    <Button type="primary">
      <Link href="/dashboard/customers/create" prefetch={false}>
        <span style={{ marginRight: 10 }}>Tạo mới</span> <PlusOutlined />
      </Link>
    </Button>
  );
}
