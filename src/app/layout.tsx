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
      <body className={inter.className} style={{ margin: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#94AF9F",
              padding: 0,
              margin: 0,
            },
            components: {
              Layout: {
                siderBg: "#94AF9F",
              },

              Menu: {
                itemBg: "#94AF9F",
                itemSelectedBg: "#DBE4C6",
                itemSelectedColor: "black",
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
