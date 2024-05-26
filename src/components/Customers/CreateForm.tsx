"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Select, Button, Space, message } from "antd";
import { NewCustomer } from "@/app/lib/definitions";

export default function CreateCustomerForm({
  provinces,
}: {
  provinces: any[];
}) {
  const [form] = Form.useForm();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [wardCode, setWardCode] = useState("");

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const provinceOptions = provinces.map((province: any) => ({
    value: province.name,
    label: province.name,
    districts: province.districts,
  }));

  const onFinish = (values: any) => {
    const newCustomer: NewCustomer = {
      fullName: values.customerName,
      taxCode: values.taxCode,
      street: values.street,
      wardCode,
    };

    console.log(newCustomer);
    message.success("Đã tạo khách hàng mới");
  };

  const onSelectProvince = (value: any, option: any) => {
    form.resetFields(["district", "ward"]);
    const districts = option.districts;
    const _districtOptions = districts.map((district: any) => ({
      value: district.name,
      label: district.name,
      wards: district.wards,
    }));
    setDistrictOptions(_districtOptions);
  };

  const onSelectDistrict = (value: any, option: any) => {
    form.resetFields(["ward"]);
    const wards = option.wards;
    const _wardOptions = wards.map((ward: any) => ({
      value: ward.name,
      label: ward.name,
      wardCode: ward.code,
    }));
    setWardOptions(_wardOptions);
  };

  const onSelectWard = (value: any, option: any) => {
    setWardCode(option.wardCode);
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Tên khách hàng">
        <Form.Item
          name="customerName"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Mã số thuế">
        <Form.Item
          name="taxCode"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Số nhà/đường">
        <Form.Item name="street" noStyle>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Tỉnh/TP">
        <Form.Item
          name="province"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
          <Select
            notFoundContent="Không tìm thấy"
            showSearch
            placeholder="- Chọn -"
            optionFilterProp="children"
            filterOption={filterOption}
            onSelect={onSelectProvince}
            options={provinceOptions}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Quận/Huyện">
        <Form.Item
          name="district"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
          <Select
            notFoundContent="Không tìm thấy"
            showSearch
            placeholder="- Chọn -"
            optionFilterProp="children"
            filterOption={filterOption}
            onSelect={onSelectDistrict}
            options={districtOptions}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Phường/Xã">
        <Form.Item
          name="ward"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
          <Select
            notFoundContent="Không tìm thấy"
            showSearch
            placeholder="- Chọn -"
            optionFilterProp="children"
            filterOption={filterOption}
            options={wardOptions}
            onSelect={onSelectWard}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>

          <Button type="primary" style={{ background: "gray" }}>
            <Link href="/dashboard/customers/">Hủy</Link>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
