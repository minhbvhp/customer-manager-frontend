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
} from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  labelCol: { span: 11 },
  wrapperCol: { span: 13 },
};

const CreateCustomerForm: React.FC = () => (
  <Form {...layout} labelAlign="left">
    <Row align="middle" justify="start" gutter={48}>
      <Col sm={{ span: 24 }}>
        <Form.Item
          name="note1"
          label="Tên khách hàng"
          rules={[{ required: true }]}
        >
          <Input style={{ minWidth: 100, maxWidth: 300 }} />
        </Form.Item>
      </Col>

      <Col sm={{ span: 24 }}>
        <Form.Item name="note2" label="Mã số thuế" rules={[{ required: true }]}>
          <Input style={{ minWidth: 100, maxWidth: 300 }} />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default CreateCustomerForm;
