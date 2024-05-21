import CustomerTable from "@/components/Customers/Table";
import { Flex, Divider } from "antd";
import { CreateCustomer } from "@/components/Customers/Button";

export default function CustomerList() {
  return (
    <Flex justify="space-between" gap="large" vertical>
      <Flex justify="end">
        <CreateCustomer />
      </Flex>

      <Divider style={{ margin: 0 }} />

      <div>
        <CustomerTable />
      </div>
    </Flex>
  );
}
