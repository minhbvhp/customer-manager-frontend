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
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#153448",
              padding: 0,
              margin: 0,
            },
            components: {
              Layout: {
                siderBg: "#153448",
              },

              Menu: {
                colorText: "white",
                itemBg: "#153448",
                itemHoverBg: "#3C5B6F",
                itemSelectedBg: "#948979",
                itemActiveBg: "#948979",
                itemSelectedColor: "white",
                iconSize: 20,
                fontSize: 16,
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
