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

      <Row style={{ padding: "0 50px 0 50px" }} justify={"center"}>
        <CreateCustomerForm />
      </Row>
    </>
  );
}
