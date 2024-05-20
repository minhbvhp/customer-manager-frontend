"use client";
import React from "react";
import { UserOutlined, FundFilled, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu, Divider, Avatar, Space, Flex, theme } from "antd";
import type { GetProp, MenuProps } from "antd";
import Link from "next/link";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
  {
    key: "customer_key_menu_item",
    label: "Khách hàng",
    icon: <UserOutlined />,
    children: [
      {
        key: "customer_list_sub_menu_item",
        label: <Link href="/dashboard/customer/list">Danh sách</Link>,
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider breakpoint="xxl" collapsedWidth="0">
        <div style={{ textAlign: "center", margin: 7 }}>
          <FundFilled
            style={{
              fontSize: "50px",
              color: "white",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          />
        </div>
        <Divider style={{ margin: 0 }} />
        <Menu mode="inline" items={items} />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            direction: "rtl",
          }}
        >
          <Space>
            <SettingOutlined
              style={{
                fontSize: "30px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />

            <Avatar style={{ verticalAlign: "middle" }} size="large">
              User
            </Avatar>
          </Space>
        </Header>
        <Divider style={{ margin: 0 }} />

        <Content style={{ margin: "2rem" }}>
          <div
            style={{
              padding: 20,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>

        <Footer style={{ textAlign: "center", background: colorBgContainer }}>
          Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
