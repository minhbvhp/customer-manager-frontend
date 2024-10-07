import { Metadata } from "next";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Báo cáo",
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          padding: 15,
          margin: 15,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
