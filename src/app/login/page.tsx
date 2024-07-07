import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LoginForm from "@/app/components/Users/LoginForm";
import { Card, Flex } from "antd";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <AntdRegistry>
        <main>
          <Flex
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundImage:
                "linear-gradient(90deg, rgba(69,53,193,1) 0%, rgba(71,140,207,1) 35%, rgba(119,228,200,1) 100%)",
            }}
          >
            <Flex
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Card
                bordered={false}
                style={{
                  minWidth: 300,
                  justifyContent: "center",
                  boxShadow: "2px 2px 2px 2px #77E4C8",
                }}
              >
                <LoginForm />
              </Card>
            </Flex>
          </Flex>
        </main>
      </AntdRegistry>
    </main>
  );
}
