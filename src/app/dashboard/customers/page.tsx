import CustomerTable from "@/components/Customers/Table";
import { Flex, Divider } from "antd";
import { CreateCustomer } from "@/components/Customers/Button";
import { fetchAllCustomers } from "@/app/lib/data";

export default async function CustomerList() {
  const allCustomers = await fetchAllCustomers();

  return (
    <Flex justify="space-between" gap="large" vertical>
      <Flex justify="end">
        <CreateCustomer />
      </Flex>

      <Divider style={{ margin: 0 }} />

      <div>
        <CustomerTable customters={allCustomers} />
      </div>

      <div>
        <ul>
          {allCustomers.map((customer: any) => (
            <li key={customer.id}>{customer.fullName}</li>
          ))}
        </ul>
      </div>
    </Flex>
  );
}
