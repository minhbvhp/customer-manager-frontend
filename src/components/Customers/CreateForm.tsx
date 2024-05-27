"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Select, Button, Space, message } from "antd";
import { NewCustomer } from "@/app/lib/definitions";
import { createSchemaFieldRule } from "antd-zod";
import { CreateCustomerFormSchema } from "@/app/lib/validations";
import { createCustomer } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function CreateCustomerForm({
  provinces,
}: {
  provinces: any[];
}) {
  const [form] = Form.useForm();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [wardCode, setWardCode] = useState("");
  const router = useRouter();

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
    const newCustomer: NewCustomer = {
      fullName: values.fullName,
      taxCode: values.taxCode,
      urn: values.urn,
      street: values.street,
      wardCode,
    };

    const result = await createCustomer(newCustomer);

    if (result.statusCode) {
      message.error(result.message[0]);
    } else {
      message.success("Đã tạo khách hàng mới");
      router.push("/dashboard/customers");
    }
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

  const rule = createSchemaFieldRule(CreateCustomerFormSchema);

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Tên khách hàng">
        <Form.Item name="fullName" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Mã số thuế">
        <Form.Item name="taxCode" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Số URN">
        <Form.Item name="urn" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Số nhà/đường">
        <Form.Item name="street" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Tỉnh/TP">
        <Form.Item name="province" noStyle>
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
        <Form.Item name="district" noStyle>
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
        <Form.Item name="wardCode" noStyle rules={[rule]}>
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

      <Form.Item label=" " colon={false} style={{ marginTop: 10 }}>
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
