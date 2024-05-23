"use client";
import React from "react";
import Link from "next/link";
import { Form, Input, Select, Button, Space } from "antd";

const { Option } = Select;

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };

// const twoColLayout = {
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 12, offset: 12 },
//     md: { span: 12, offset: 8 },
//     lg: { span: 12, offset: 8 },
//   },
// };

const CreateCustomerForm: React.FC = () => (
  <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
  >
    <Form.Item label="Tên khách hàng">
      <Form.Item
        name="customerName"
        noStyle
        rules={[{ required: true, message: "*Bắt buộc" }]}
      >
        <Input style={{ minWidth: 300 }} />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Mã số thuế">
      <Form.Item
        name="taxCode"
        noStyle
        rules={[{ required: true, message: "*Bắt buộc" }]}
      >
        <Input style={{ minWidth: 300 }} />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Số nhà/đường">
      <Form.Item
        name="street"
        noStyle
        rules={[{ required: true, message: "*Bắt buộc" }]}
      >
        <Input style={{ minWidth: 300 }} />
      </Form.Item>
    </Form.Item>

    <Form.Item label="Địa chỉ">
      <Space.Compact>
        <Form.Item
          name="province"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc phải có tên Tỉnh/TP" }]}
        >
          <Select placeholder="Tỉnh/TP">
            <Option value="t1">Tỉnh 1</Option>
            <Option value="t2">Tỉnh 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="district"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc phải có tên Quận" }]}
        >
          <Select placeholder="Quận/Huyện">
            <Option value="q1">Quận 1</Option>
            <Option value="q2">Quận 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="ward"
          noStyle
          rules={[{ required: true, message: "*Bắt buộc phải có tên Phường" }]}
        >
          <Select placeholder="Phường/Xã">
            <Option value="p1">Phường 1</Option>
            <Option value="p2">Phường 2</Option>
          </Select>
        </Form.Item>
      </Space.Compact>
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

export default CreateCustomerForm;
