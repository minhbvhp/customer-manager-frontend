import Link from "next/link";
import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <main>
      <Result
        status="warning"
        title="Lỗi 404"
        subTitle="Không thể tìm thấy người dùng này"
        extra={
          <Link href="/dashboard/admin/">
            <Button type="primary">Quay lại</Button>
          </Link>
        }
      />
    </main>
  );
}
