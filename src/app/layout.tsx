import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Quản lý khách hàng",
  description: "Ứng dụng quản lý khách khàng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#FFBB70",
              borderRadius: 2,
              // colorBgContainer: "#f5f5f5",
              padding: 0,
              margin: 0,
            },
            components: {
              Layout: {
                siderBg: "#ED9455",
              },

              Menu: {
                itemBg: "#ED9455",
              },
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
