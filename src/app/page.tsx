import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Card, Flex, Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={styles.main}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage:
          "linear-gradient(90deg, rgba(77,134,156,1) 0%, rgba(122,178,178,1) 36%, rgba(205,232,229,1) 100%)",
      }}
    >
      <AntdRegistry>
        <Card
          bordered={false}
          style={{
            minWidth: 300,
            justifyContent: "center",
            boxShadow: "5px 5px 5px #8E3E63",
          }}
        >
          <Flex
            justify="flex-start"
            vertical
            style={{
              padding: 20,
            }}
          >
            <h1 style={{ color: "#8E3E63" }}>OH MY JOB</h1>
            <div style={{ maxWidth: 500 }}>
              <p style={{ fontSize: 18, lineHeight: 1.7 }}>
                Đây là một Project thử nghiệm đơn giản để quản lý thông tin
                khách hàng. Các chức năng chính bao gồm:
              </p>

              <ul style={{ fontSize: 18, lineHeight: 1.7 }}>
                <li>Tạo mới khách hàng</li>
                <li>Chỉnh sửa thông tin khách hàng</li>
                <li>Xóa khách hàng</li>
                <li>Thêm, cập nhật thông tin người liên hệ của khách hàng</li>
                <li>
                  Tìm kiếm, lọc thông tin khách hàng (theo tên, địa chỉ, tỉnh
                  thành, mã số thuế)
                </li>
                <li>Copy thông tin chi tiết của khách hàng vào clipboard</li>
              </ul>
            </div>

            <Link href="/login">
              <Button type="primary">
                <LoginOutlined />
                Đăng nhập
              </Button>
            </Link>
          </Flex>
        </Card>
      </AntdRegistry>
    </main>
  );
}
