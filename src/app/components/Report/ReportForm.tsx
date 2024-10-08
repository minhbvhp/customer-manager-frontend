"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  message,
  Col,
  Row,
  Divider,
} from "antd";
import { Customer } from "@/app/lib/definitions";
import CustomerReportTable from "@/app/components/Report/CustomerReportTable";

export default function ReportForm({
  provinces,
  customers,
}: {
  provinces: any[];
  customers: any[];
}) {
  const [form] = Form.useForm();
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [allFilter, setAllFilter] = useState([
    { label: "Tất cả", value: "all" },
  ]);
  const [filteredCustomer, setFilteredCustomer] = useState([] as Customer[]);

  useEffect(() => {
    if (!provinces) {
      setIsProvincesLoading(true);
    } else {
      const _allFilter = allFilter.concat(provinceOptions);
      setAllFilter(_allFilter);
    }
  }, [provinces]);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const provinceOptions = provinces.map((province: any) => ({
    value: province.name,
    label: province.name,
    districts: province.districts,
  }));

  const onFinish = async (values: any) => {
    setIsFormSubmitting(true);

    const { province } = values;

    if (province) {
      if (province === "all") {
        setFilteredCustomer(customers);
      } else {
        const _filteredCustomer = customers?.filter(
          (customer) => customer.ward.district.province.name === province
        );
        setFilteredCustomer(_filteredCustomer);
      }
    }

    setIsFormSubmitting(false);

    // if (result.statusCode) {
    //   message.error(
    //     Array.isArray(result.message) ? result.message[0] : result.message
    //   );
    // } else {
    //   message.success(result.message);
    //   router.push("/dashboard/customers");
    // }
  };

  return (
    <>
      <Form
        autoCorrect="off"
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        layout="inline"
      >
        <Form.Item label="Theo Tỉnh/TP" required>
          <Form.Item name="province" noStyle>
            <Select
              loading={isProvincesLoading}
              notFoundContent="Không tìm thấy"
              showSearch
              placeholder="- Chọn -"
              optionFilterProp="children"
              filterOption={filterOption}
              options={allFilter}
              style={{ width: 150 }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
            Lọc
          </Button>
        </Form.Item>
      </Form>

      <Divider />

      {filteredCustomer ? (
        <>
          <CustomerReportTable customers={filteredCustomer} />
        </>
      ) : (
        <p>Chọn phương thức</p>
      )}
    </>
  );
}
