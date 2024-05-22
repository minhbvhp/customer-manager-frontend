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

      <Row>
        <Col span={24}>
          <Flex justify="center" align="center">
            <Flex justify="center" align="flex-end" vertical>
              <CreateCustomerForm />

              <Button type="primary">Tạo mới</Button>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </>
  );
}
