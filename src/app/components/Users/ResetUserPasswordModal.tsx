import { UserDataType } from "@/app/lib/definitions";
import {
  Modal,
  Button,
  Space,
  Divider,
  theme,
  Form,
  Input,
  message,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { resetUserPassword } from "@/app/lib/actions";

export default function ResetUserPasswordModal({
  user,
  isResetUserPasswordModalOpen,
  setIsResetUserPasswordModalOpen,
}: {
  user: UserDataType;
  isResetUserPasswordModalOpen: boolean;
  setIsResetUserPasswordModalOpen: (v: boolean) => void;
}) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const result = await resetUserPassword(user?.userId, {
      password: values?.password,
    });

    if (result.statusCode) {
      message.error(
        Array.isArray(result.message) ? result.message[0] : result.message
      );
    } else {
      message.success(result.message);
    }

    handleCloseResetPasswordModal();
  };

  const handleCloseResetPasswordModal = () => {
    setIsResetUserPasswordModalOpen(false);
  };

  return (
    <Modal
      destroyOnClose={true}
      width={450}
      title={
        <>
          <Space size={"middle"}>
            <span style={{ color: colorPrimary, fontSize: 16 }}>
              {user?.email} - {user?.name}
            </span>
          </Space>
          <Divider style={{ margin: "10px 0px 25px 0px" }} />
        </>
      }
      open={isResetUserPasswordModalOpen}
      footer={<></>}
      onCancel={() => handleCloseResetPasswordModal()}
      centered
    >
      <Form
        preserve={false}
        autoCorrect="off"
        autoComplete="off"
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="password"
          style={{ margin: "0px 0px 40px 0px" }}
          rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
