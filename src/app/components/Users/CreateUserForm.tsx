"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Space, message } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { CreateUserFormSchema } from "@/app/lib/validations";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const [form] = Form.useForm();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setIsFormSubmitting(true);
    console.log(values);

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

  const rule = createSchemaFieldRule(CreateUserFormSchema);

  return (
    <Form
      autoCorrect="off"
      autoComplete="off"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Email" required>
        <Form.Item name="email" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Tên người dùng" required>
        <Form.Item name="name" noStyle rules={[rule]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Mật khẩu" required>
        <Form.Item name="password" noStyle rules={[rule]}>
          <Input.Password />
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space size={"middle"}>
          <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
            Tạo
          </Button>

          <Button type="primary" style={{ background: "gray" }}>
            <Link href="/dashboard/admin/">Hủy</Link>
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
