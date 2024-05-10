import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";

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
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
