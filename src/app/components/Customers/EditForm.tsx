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
  Divider,
  Col,
  Row,
  Modal,
} from "antd";
import { Customer, UpdateCustomer } from "@/app/lib/definitions";
import { createSchemaFieldRule } from "antd-zod";
import { UpdateCustomerFormSchema } from "@/app/lib/validations";
import { deleteCustomer, updateCustomer } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function EditCustomerForm({
  customer,
  provinces,
}: {
  customer: Customer;
  provinces: any[];
}) {
  //#region hook
  const [form] = Form.useForm();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [wardCode, setWardCode] = useState("");
  const [isProvincesLoading, setIsProvincesLoading] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  //#endregion

  //#region set initial values
  const initialValues = {
    id: customer.id,
    fullName: customer.fullName,
    taxCode: customer.taxCode,
    urn: customer.urn,
    street: customer.street,
    wardCode: customer.wardCode,
    province: customer.ward?.district?.province?.name,
    district: customer.ward?.district?.name,
    ward: customer.ward?.name,
    contacts: customer.contacts,
  };

  useEffect(() => {
    if (!provinces) setIsProvincesLoading(true);
  }, [provinces]);

  useEffect(() => {
    form.setFieldsValue(initialValues);

    const matchProvince = provinces.find(
      (province: any) =>
        province.name === customer.ward?.district?.province?.name
    );

    const _districtOptions = matchProvince?.districts.map((district: any) => ({
      value: district.name,
      label: district.name,
      wards: district.wards,
    }));
    setDistrictOptions(_districtOptions);

    const matchDistrict = matchProvince?.districts.find(
      (district: any) => district.name === customer.ward.district.name
    );

    const _wardOptions = matchDistrict?.wards.map((ward: any) => ({
      value: ward.name,
      label: ward.name,
      wardCode: ward.code,
    }));
    setWardOptions(_wardOptions);

    setWardCode(initialValues.wardCode);
  }, []);
  //#endregion

  //#region submit form update customer
  const onFinish = async (values: any) => {
    setIsFormSubmitting(true);

    const updatingCustomer: UpdateCustomer = {
      fullName: values.fullName,
      taxCode: values.taxCode,
      urn: values.urn,
      street: values.street,
      contacts: values.contacts,
      wardCode,
    };

    const result = await updateCustomer(customer.id, updatingCustomer);

    setIsFormSubmitting(false);

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      message.success(result.message);
      router.push("/dashboard/customers");
    }
  };

  //#endregion

  //#region observe select change
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const provinceOptions = provinces.map((province: any) => ({
    value: province.name,
    label: province.name,
    districts: province.districts,
  }));

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

  //#endregion

  //#region rule
  const rule = createSchemaFieldRule(
    UpdateCustomerFormSchema.required({
      fullName: true,
      ward: true,
    })
  );
  //#endregion

  //#region delete customer
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteOk = async () => {
    setIsFormSubmitting(true);

    const result = await deleteCustomer(customer.id);

    setIsFormSubmitting(false);

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      message.success(result.message);
      router.push("/dashboard/customers");
    }
  };
  //#endregion

  return (
    <Row>
      <Col span={24}>
        <Form
          autoCorrect="off"
          autoComplete="off"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
        >
          <Row>
            <Col span={24} lg={{ span: 12 }} style={{ padding: "0px 10px" }}>
              <Divider style={{ padding: "0px 20px" }}>
                Thông tin cơ bản
              </Divider>

              <Form.Item label="Tên đầy đủ" required>
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
            </Col>

            <Col
              span={24}
              lg={{ span: 12 }}
              style={{
                padding: "0px 10px",
              }}
            >
              <Divider style={{ padding: "0px 20px" }}>Khác</Divider>

              <div style={{ alignContent: "center" }}>
                <Form.List name="contacts">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[
                              { required: true, message: "Thông tin bắt buộc" },
                            ]}
                          >
                            <Input placeholder="Tên" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "phone"]}
                            rules={[
                              { required: true, message: "Thông tin bắt buộc" },
                            ]}
                          >
                            <Input placeholder="Số điện thoại" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          // block
                          icon={<PlusOutlined />}
                        >
                          Thêm người liên hệ
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </Col>
          </Row>

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
                    Cập nhật
                  </Button>

                  <Link href="/dashboard/customers/">
                    <Button type="primary" style={{ background: "gray" }}>
                      Hủy
                    </Button>
                  </Link>

                  <Button
                    type="primary"
                    danger
                    onClick={showDeleteModal}
                    loading={isFormSubmitting}
                  >
                    Xóa
                  </Button>

                  <Modal
                    title="Xác nhận xóa ?"
                    open={isDeleteModalOpen}
                    onOk={handleDeleteOk}
                    okText="Xóa"
                    confirmLoading={isFormSubmitting}
                    onCancel={handleDeleteCancel}
                    cancelText="Hủy"
                    centered
                  >
                    <p>Bạn chắc chắn muốn xóa khách hàng này chứ ?</p>
                  </Modal>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
