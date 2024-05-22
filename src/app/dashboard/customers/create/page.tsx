import CreateCustomerForm from "@/components/Customers/CreateForm";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider, Button, Flex, Row, Col } from "antd";

export default async function CreateCustomerPage() {
  return (
    <>
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

      <div>
        <CreateCustomerForm />

        <div>
          <Button type="primary">Tạo mới</Button>
        </div>
      </div>
    </>
  );
}
