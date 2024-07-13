"use client";

import React, { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { LoginPayload } from "@/app/lib/definitions";
import { login } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setIsFormSubmitting(true);

    const payload: LoginPayload = {
      email: values.email,
      password: values.password,
    };

    const result = await login(payload);

    setIsFormSubmitting(false);

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      // const resultFromNextServer = await fetch("/api/auth", {
      //   method: "POST",
      //   body: JSON.stringify(result),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload,
      //   };

      //   if (!res.ok) {
      //     throw data;
      //   }

      //   return data;
      // });

      router.push("/dashboard");
    }
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Flex justify="center">
        <h2
          style={{
            color: "#8E3E63",
            margin: "20px 0px 50px 0px",
          }}
        >
          ĐĂNG NHẬP
        </h2>
      </Flex>

      <Form.Item
        name="email"
        style={{ margin: "0px 0px 40px 0px" }}
        rules={[{ required: true, type: "email", message: "Hãy nhập email" }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        style={{ margin: "0px 0px 40px 0px" }}
        rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Lưu phiên đăng nhập</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
