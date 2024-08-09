"use client";

import { User, UserDataType } from "@/app/lib/definitions";
import type { TableColumnsType } from "antd";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function UserTable({ users }: { users: User[] }) {
  const data: UserDataType[] = users.map((user: any) => ({
    key: `user-key-${user.id}`,
    userId: user.id,
    name: user.name,
    email: user.email,
  }));

  const columns: TableColumnsType<UserDataType> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            type="text"
            style={{ color: "orange" }}
          />

          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            type="text"
            style={{ color: "red" }}
          />
        </Space>
      ),
    },
  ];
  return (
    <Table
      // loading={isLoading}
      pagination={{ pageSize: 8 }}
      locale={{
        emptyText: "Không tìm thấy người dùng",
      }}
      columns={columns}
      dataSource={data}
    />
  );
}
