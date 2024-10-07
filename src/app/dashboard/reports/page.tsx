import { Flex, Divider, Select } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { shantell } from "@/app/utils/fontSetting";
import { fetchAllCustomers, fetchAllProvinces } from "@/app/lib/data";
import { Customer, CustomerDataType } from "@/app/lib/definitions";
import { useState } from "react";

export default async function ReportPage() {
  const customers = await fetchAllCustomers();
  const provinces = await fetchAllProvinces();

  const [isProvincesLoading, setIsProvincesLoading] = useState(false);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const provinceOptions = provinces.map((province: any) => ({
    value: province.name,
    label: province.name,
    districts: province.districts,
  }));

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

          <Flex justify="space-between" align="flex-end">
            <span>Lọc theo Tỉnh/TP:</span>

            <Select
              loading={isProvincesLoading}
              notFoundContent="Không tìm thấy"
              showSearch
              placeholder="- Chọn -"
              optionFilterProp="children"
              filterOption={filterOption}
              options={provinceOptions}
            />
          </Flex>

          {/* {customers.map((customer: Customer, index: any) => {
            return <p>{customer.fullName}</p>;
          })} */}
        </Flex>
      </AntdRegistry>
    </main>
  );
}
