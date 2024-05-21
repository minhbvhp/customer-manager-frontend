"use client";
import React from "react";
import { FundFilled, SettingOutlined } from "@ant-design/icons";
import { Layout, Divider, Avatar, Space, theme } from "antd";
import DashboardMenu from "@/components/Dashboard/Menu";

const { Header, Content, Footer, Sider } = Layout;

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
        <DashboardMenu />
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

        <Content style={{ margin: "1rem" }}>
          <div
            style={{
              padding: 20,
              minHeight: 460,
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
