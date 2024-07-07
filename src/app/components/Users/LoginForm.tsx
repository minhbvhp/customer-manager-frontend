"use client";

import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Divider } from "antd";

const LoginForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
            margin: "30px 0px",
          }}
        >
          ĐĂNG NHẬP
        </h2>
      </Flex>

      <Form.Item
        name="username"
        style={{ margin: "0px 0px 40px 0px" }}
        rules={[{ required: true, message: "Hãy nhập email" }]}
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

        <p style={{ margin: 0 }}>
          <a href="">Quên mật khẩu</a>
        </p>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
