"use client";
import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TimePicker,
  TreeSelect,
  Flex,
} from "antd";

const { Option } = Select;

const layout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};

const CreateCustomerForm: React.FC = () => (
  <Form {...layout}>
    <Flex justify="flex-start" gap="middle">
      <Form.Item
        {...tailLayout}
        name="note"
        label="Tên khách hàng"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="note"
        label="Mã số thuế"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Flex>

    <Flex justify="flex-start" gap="middle">
      <Form.Item
        name="note"
        label="Số nhà/tên đường"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Phường">
        <Select style={{ minWidth: 80 }}>
          <Select.Option value="p1">Phường 1</Select.Option>
          <Select.Option value="p2">Phường 2</Select.Option>
          <Select.Option value="p3">Phường 3</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Quận">
        <Select style={{ minWidth: 80 }}>
          <Select.Option value="q1">Quận 1</Select.Option>
          <Select.Option value="q2">Quận 2</Select.Option>
          <Select.Option value="q3">Quận 3</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Tỉnh/TP">
        <Select style={{ minWidth: 80 }}>
          <Select.Option value="tp1">Tỉnh/TP 1</Select.Option>
          <Select.Option value="tp2">Tỉnh/TP 2</Select.Option>
          <Select.Option value="tp3">Tỉnh/TP 3</Select.Option>
        </Select>
      </Form.Item>
    </Flex>

    <Flex justify="flex-start" gap="middle">
      <Form.Item label="Từ ngày">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Đến ngày">
        <DatePicker />
      </Form.Item>
    </Flex>

    <Form.Item label="Đại diện">
      <Select>
        <Select.Option value="demo">Demo</Select.Option>
      </Select>
    </Form.Item>
  </Form>
);

export default CreateCustomerForm;
