"use client";
import React from "react";
import Link from "next/link";
import { Form, Input, Select, Button, Space } from "antd";
import { useActionState } from "react";

const { Option } = Select;

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export default function CreateCustomerForm({
  provinces,
}: {
  provinces: any[];
}) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("On Finish: ", values);
  };

  const onProvinceChange = (value: any, option: any) => {
    console.log("On Province change: ", value, option);
  };

  const handleFormValuesChange = (changedValue: any, value: any) => {
    console.log("On Form values change: ", changedValue, value);
  };

  const provinceOptions = provinces.map((province: any) => ({
    value: province.name,
    label: province.name,
  }));

  return (
    <Form
      onValuesChange={handleFormValuesChange}
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
        <Form.Item
          name="street"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc" }]}
        >
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
            options={provinceOptions}
            onChange={onProvinceChange}
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
            // options={provinceOptions}
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
            // options={provinceOptions}
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
