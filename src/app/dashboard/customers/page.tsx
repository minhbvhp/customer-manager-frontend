import CustomerTable from "@/components/Customers/Table";
import { Flex, Divider } from "antd";
import { CreateCustomer } from "@/components/Customers/Button";
import { fetchAllCustomers } from "@/app/lib/data";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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

          <CustomerTable customers={customers} />
        </Flex>
      </AntdRegistry>
    </main>
  );
}
