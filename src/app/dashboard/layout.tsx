import { Layout } from "antd";
import { Header, Footer, Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout>
        <Header>Tiêu đề</Header>
        <Layout>
          {/* <Sider>Thanh bên trái</Sider> */}
          <Content>{children}</Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </>
  );
}
