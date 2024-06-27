import { Breadcrumb, Divider, Spin, Flex } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { fetchAllProvinces, fetchCustomerById } from "@/app/lib/data";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense } from "react";
import EditCustomerForm from "@/app/components/Customers/EditForm";
import { notFound } from "next/navigation";

export default async function DetailCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [customer, provinces] = await Promise.all([
    fetchCustomerById(id),
    fetchAllProvinces(),
  ]);

  if (!customer) {
    notFound();
  }

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
              title: "Chi tiết",
            },
          ]}
        />

        <Divider orientation="left">{customer.fullName.toUpperCase()}</Divider>

        <Suspense fallback={<Spin size="large" />}>
          <EditCustomerForm customer={customer} provinces={provinces} />
        </Suspense>
      </AntdRegistry>
    </main>
  );
}
