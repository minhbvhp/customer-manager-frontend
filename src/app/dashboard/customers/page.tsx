import CustomerTable from "@/components/Customers/Table";
import { Flex, Divider, Spin } from "antd";
import { CreateCustomer } from "@/components/Customers/Button";
import { fetchAllCustomers } from "@/app/lib/data";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Suspense } from "react";

export default async function CustomerPage() {
  const customers = await fetchAllCustomers();

  return (
    <main>
      <AntdRegistry>
        <Flex justify="space-between" gap="large" vertical>
          <Flex justify="end">
            <CreateCustomer />
          </Flex>

          <Divider style={{ margin: 0 }} />

          <Suspense fallback={<Spin size="large" />}>
            <CustomerTable customers={customers} />
          </Suspense>
        </Flex>
      </AntdRegistry>
    </main>
  );
}
