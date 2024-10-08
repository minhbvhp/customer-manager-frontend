"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Form, Input, Button, Space, message, Modal } from "antd";
import { useRouter } from "next/navigation";
import { UpdateUser, User } from "@/app/lib/definitions";
import { deleteUser, updateUser } from "@/app/lib/actions";

export default function EditUserForm({ user }: { user: User }) {
  //#region hook
  const [form] = Form.useForm();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  //#endregion

  //#region set initial values
  const initialValues = {
    name: user.name,
    email: user.email,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);
  //#endregion

  //#region submit form update user
  const onFinish = async (values: any) => {
    setIsFormSubmitting(true);

    const updatingUser: UpdateUser = {
      name: values.name,
    };

    const result = await updateUser(user.id, updatingUser);

    setIsFormSubmitting(false);

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      message.success(result.message);
      router.push("/dashboard/admin");
    }
  };

  //#endregion

  //#region delete user
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteOk = async () => {
    setIsFormSubmitting(true);

    const result = await deleteUser(user.id);

    setIsFormSubmitting(false);

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      message.success(result.message);
      router.push("/dashboard/admin");
    }
  };
  //#endregion

  return (
    <Form
      autoCorrect="off"
      autoComplete="off"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="Email">
        <Form.Item name="email" noStyle>
          <Input autoComplete="none" disabled />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Tên người dùng" required>
        <Form.Item
          name="name"
          noStyle
          rules={[{ required: true, message: "Hãy nhập tên người dùng" }]}
        >
          <Input autoComplete="none" />
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Space size={"middle"}>
          <Button type="primary" htmlType="submit" loading={isFormSubmitting}>
            Cập nhật
          </Button>

          <Link href="/dashboard/admin/">
            <Button type="primary" style={{ background: "gray" }}>
              Hủy
            </Button>
          </Link>

          <Button
            type="primary"
            danger
            onClick={showDeleteModal}
            loading={isFormSubmitting}
          >
            Xóa
          </Button>

          <Modal
            title="Xác nhận xóa ?"
            open={isDeleteModalOpen}
            onOk={handleDeleteOk}
            okText="Xóa"
            confirmLoading={isFormSubmitting}
            onCancel={handleDeleteCancel}
            cancelText="Hủy"
            centered
          >
            <p>Bạn chắc chắn muốn xóa người dùng này chứ ?</p>
          </Modal>
        </Space>
      </Form.Item>
    </Form>
  );
}
