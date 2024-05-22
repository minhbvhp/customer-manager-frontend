import CustomerTable from "@/components/Customers/Table";
import { Flex, Divider } from "antd";
import { CreateCustomer } from "@/components/Customers/Button";
import { fetchAllCustomers } from "@/app/lib/data";

export default async function CustomerPage() {
  const customers = await fetchAllCustomers();

  return (
    <Flex justify="space-between" gap="large" vertical>
      <Flex justify="end">
        <CreateCustomer />
      </Flex>

      <Divider style={{ margin: 0 }} />

      <div>
        <CustomerTable customers={customers} />
      </div>
    </Flex>
  );
}
