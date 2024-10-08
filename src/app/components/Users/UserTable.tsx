"use client";

import { User, UserDataType } from "@/app/lib/definitions";
import type { TableColumnsType } from "antd";
import { Table, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UndoOutlined } from "@ant-design/icons";
import ResetUserPasswordModal from "@/app/components/Users/ResetUserPasswordModal";

export default function UserTable({ users }: { users: User[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [user, setUser] = useState<UserDataType>({
    key: "",
    userId: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!users) setIsLoading(true);
  }, [users]);

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
      render: (_: any, record: UserDataType) => (
        <Link href={`/dashboard/admin/users/${record.userId}`}>
          {record.name}
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Thao tác",
      render: (_, record: UserDataType) => (
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          type="text"
          title="Reset mật khẩu"
          style={{ color: "orangeRed" }}
          onClick={() => showUserDetail(record)}
        />
      ),
    },
  ];

  const showUserDetail = (record: UserDataType) => {
    setUser(record);
    setIsResetModalOpen(true);
  };

  return (
    <>
      <Table
        loading={isLoading}
        pagination={{ pageSize: 8, locale: { items_per_page: " / trang" } }}
        locale={{
          emptyText: "Không tìm thấy người dùng",
        }}
        columns={columns}
        dataSource={data}
      />

      <ResetUserPasswordModal
        user={user}
        setIsResetUserPasswordModalOpen={setIsResetModalOpen}
        isResetUserPasswordModalOpen={isResetModalOpen}
      />
    </>
  );
}
