"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Input, Select, Button, Space, message } from "antd";
import { Customer, NewCustomer } from "@/app/lib/definitions";
import { createSchemaFieldRule } from "antd-zod";
import { CreateCustomerFormSchema } from "@/app/lib/validations";
import { createCustomer } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function EditCustomerForm({
  customer,
  provinces,
}: {
  customer: Customer;
  provinces: any[];
}) {
  const initialValues = {
    id: customer.id,
    fullName: customer.fullName,
    taxCode: customer.taxCode,
    urn: customer.urn,
    street: customer.street,
    wardCode: customer.wardCode,
    province: customer.ward.district.province.name,
    district: customer.ward.district.name,
    ward: customer.ward.name,
  };

  const [form] = Form.useForm();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [wardCode, setWardCode] = useState("");
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!provinces) setIsProvincesLoading(true);
  }, [provinces]);

  useEffect(() => {
    form.setFieldsValue(initialValues);

    const matchProvince = provinces.find(
      (province: any) => province.name === customer.ward.district.province.name
    );

    const _districtOptions = matchProvince.districts.map((district: any) => ({
      value: district.name,
      label: district.name,
      wards: district.wards,
    }));
    setDistrictOptions(_districtOptions);

    const matchDistrict = matchProvince.districts.find(
      (district: any) => district.name === customer.ward.district.name
    );

    const _wardOptions = matchDistrict.wards.map((ward: any) => ({
      value: ward.name,
      label: ward.name,
      wardCode: ward.code,
    }));
    setWardOptions(_wardOptions);
  }, []);

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

    const newCustomer: NewCustomer = {
      fullName: values.fullName,
      taxCode: values.taxCode,
      urn: values.urn,
      street: values.street,
      contacts: values.contacts,
      wardCode,
    };

    // const result = await createCustomer(newCustomer);

    // setIsFormSubmitting(false);

    // if (result.statusCode) {
    //   message.error(
    //     Array.isArray(result.message) ? result.message[0] : result.message
    //   );
    // } else {
    //   message.success(result.message);
    //   router.push("/dashboard/customers");
    // }
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

  const rule = createSchemaFieldRule(
    CreateCustomerFormSchema.required({
      fullName: true,
      ward: true,
    })
  );

  return (
    <Form
      autoCorrect="off"
      autoComplete="off"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Tên khách hàng" required>
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

      <Form.Item label="Tỉnh/TP" required>
        <Form.Item name="province" noStyle>
          <Select
            loading={isProvincesLoading}
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

      <Form.Item label="Quận/Huyện" required>
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

      <Form.Item label="Phường/Xã" required>
        <Form.Item name="ward" noStyle rules={[rule]}>
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
          <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
            Cập nhật
          </Button>

          <Button
            type="primary"
            danger
            htmlType="button"
            loading={isFormSubmitting}
          >
            Xóa
          </Button>

          <Button type="primary" style={{ background: "gray" }}>
            <Link href="/dashboard/customers/">Hủy</Link>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
