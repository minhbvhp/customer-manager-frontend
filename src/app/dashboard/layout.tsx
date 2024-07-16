"use client";
import React, { useEffect, useState } from "react";
import { FundFilled, SettingOutlined } from "@ant-design/icons";
import { Layout, Divider, Space, theme } from "antd";
import DashboardMenu from "@/app/components/Dashboard/Menu";
import UserIcon from "@/app/components/Users/UserIcon";
import { getUserProfile } from "@/app/lib/data";

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [userName, setUserName] = useState("N/A");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getUserName")
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userName);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <Sider
        breakpoint="xxl"
        collapsedWidth="0"
        style={{
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ textAlign: "center", margin: 7 }}>
          <FundFilled
            style={{
              fontSize: "50px",
              color: "white",
              display: "inline-block",
            }}
          />
        </div>
        <Divider style={{ margin: 0, borderColor: "white", opacity: 0.1 }} />
        <DashboardMenu />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            direction: "rtl",
            position: "sticky",
            zIndex: 100,
            top: 0,
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 15px 10px -15px",
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

            <UserIcon userName={userName} />
          </Space>
        </Header>

        <Divider style={{ margin: 0 }} />

        <Content style={{ margin: 20 }}>
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

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <Divider
            orientation="center"
            style={{
              borderColor: "#dfae04",
              margin: 0,
              padding: 5,
            }}
          />
          Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
