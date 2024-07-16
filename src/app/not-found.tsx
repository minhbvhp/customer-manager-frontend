import Link from "next/link";
import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <main>
      <Result
        status="warning"
        title="Lỗi 404"
        subTitle="Trang bạn muốn tìm không tồn tại"
        extra={
          <Button type="primary">
            <Link href="/">Quay lại</Link>
          </Button>
        }
      />
    </main>
  );
}
