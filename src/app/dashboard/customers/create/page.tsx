import CreateCustomerForm from "@/components/Customers/CreateForm";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider } from "antd";

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

      <CreateCustomerForm />
    </>
  );
}
