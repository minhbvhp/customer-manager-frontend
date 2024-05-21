import CustomerTable from "@/components/Customers/Table";
import { Button, Flex, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function CustomerList() {
  return (
    <Flex justify="space-between" gap="large" vertical>
      <Flex justify="end">
        <Button type="primary">
          Tạo mới
          <PlusOutlined />
        </Button>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <div>
        <CustomerTable />
      </div>
    </Flex>
  );
}
