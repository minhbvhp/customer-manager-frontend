"use client";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FundFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Divider, Avatar, Space, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `Menu ${index + 1}`,
}));

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
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
        <Menu
          style={{ height: "100vh" }}
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
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
