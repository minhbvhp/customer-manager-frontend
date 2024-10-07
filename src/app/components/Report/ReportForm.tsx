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
    <Form
      autoCorrect="off"
      autoComplete="off"
      wrapperCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
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
            options={provinceOptions}
          />
        </Form.Item>
      </Form.Item>

      <Row>
        <Divider />
        <Col span={24} lg={{ span: 12 }}>
          <Form.Item
            label=" "
            labelCol={{ xs: { span: 0 }, lg: { span: 7 } }}
            colon={false}
          >
            <Space size={"middle"}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isFormSubmitting}
              >
                Tạo
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
