import { Flex, Divider, Form, Input, Button } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { shantell } from "@/app/utils/fontSetting";
import { fetchAllCustomers, fetchAllProvinces } from "@/app/lib/data";
import { Customer, CustomerDataType } from "@/app/lib/definitions";
import ReportForm from "@/app/components/Report/ReportForm";

export default async function ReportPage() {
  const customers = await fetchAllCustomers();
  const provinces = await fetchAllProvinces();

  return (
    <main>
      <AntdRegistry>
        <Flex justify="space-between" gap="large" vertical>
          <Flex justify="space-between" align="flex-end">
            <h2
              className={shantell.className}
              style={{
                color: "#8E3E63",
                alignItems: "end",
                padding: 0,
                margin: 0,
              }}
            >
              Báo cáo
            </h2>
          </Flex>

          <Divider style={{ margin: 0 }} />

          <ReportForm provinces={provinces} customers={customers} />
        </Flex>
      </AntdRegistry>
    </main>
  );
}
