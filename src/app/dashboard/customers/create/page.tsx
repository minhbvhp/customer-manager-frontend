import { fetchAllProvinces } from "@/app/lib/data";
import CreateCustomerForm from "@/components/Customers/CreateForm";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Divider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default async function CreateCustomerPage() {
  const provinces = await fetchAllProvinces();

  return (
    <main>
      <AntdRegistry>
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

        <CreateCustomerForm provinces={provinces} />
      </AntdRegistry>
    </main>
  );
}
