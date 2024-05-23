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
  Row,
  Col,
  Button,
} from "antd";

const { Option } = Select;

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 16 },
    lg: { span: 16 },
  },
};

const twoColLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 12 },
    md: { span: 12, offset: 8 },
    lg: { span: 12, offset: 8 },
  },
};

const CreateCustomerForm: React.FC = () => (
  <Form labelAlign="left">
    <Row align="middle" justify="start" gutter={48}>
      <Col>
        <Form.Item
          name="note1"
          label="Tên khách hàng"
          rules={[{ required: true }]}
        >
          <Input style={{ minWidth: 300 }} />
        </Form.Item>
      </Col>

      <Col>
        <Form.Item name="note2" label="Mã số thuế" rules={[{ required: true }]}>
          <Input style={{ minWidth: 300 }} />
        </Form.Item>
      </Col>
    </Row>

    <Row align="middle" justify="start" gutter={12}>
      <Col>
        <Row justify="start">
          <Form.Item
            name="note3"
            label="Số nhà/đường"
            rules={[{ required: true }]}
          >
            <Input style={{ minWidth: 300 }} />
          </Form.Item>

          <Form.Item name="note4" label="Phường" rules={[{ required: true }]}>
            <Select placeholder="- Chọn -" style={{ minWidth: 300 }}>
              <Option value="1">Phường 1</Option>
              <Option value="2">Phường 2</Option>
              <Option value="3">Phường 3</Option>
            </Select>
          </Form.Item>
        </Row>
      </Col>

      <Col>
        <Row justify="start">
          <Form.Item
            name="note5"
            label="Quận/Huyện"
            rules={[{ required: true }]}
          >
            <Select placeholder="- Chọn -" style={{ minWidth: 300 }}>
              <Option value="1">Quận 1</Option>
              <Option value="2">Quận 2</Option>
              <Option value="3">Quận 3</Option>
            </Select>
          </Form.Item>

          <Form.Item name="note6" label="Tỉnh/TP" rules={[{ required: true }]}>
            <Select placeholder="- Chọn -" style={{ minWidth: 300 }}>
              <Option value="1">Tỉnh 1</Option>
              <Option value="2">Tỉnh 2</Option>
              <Option value="3">Tỉnh 3</Option>
            </Select>
          </Form.Item>
        </Row>
      </Col>
    </Row>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Xác nhận
      </Button>
    </Form.Item>
  </Form>
);

export default CreateCustomerForm;
