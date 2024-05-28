import { Breadcrumb, Divider, Spin } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default async function DetailCustomerPage() {
  return (
    <main>
      <Breadcrumb
        items={[
          {
            href: "/dashboard",
            title: <HomeOutlined />,
          },
          {
            href: "/dashboard/customers",
            title: (
              <>
                <UserOutlined />
                <span>Khách hàng</span>
              </>
            ),
          },
          {
            title: "Tạo mới",
          },
        ]}
      />

      <Divider />

      {/* <Suspense fallback={<Spin size="large" />}>
        <CreateCustomerForm provinces={provinces} />
      </Suspense> */}
    </main>
  );
}
