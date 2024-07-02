import { Contact, CustomerDataType } from "@/app/lib/definitions";
import { Modal, Button, Space, Divider, theme, Flex, Input } from "antd";
import {
  InfoCircleOutlined,
  CopyOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function CustomerDetailModal({
  customer,
  isDetailModalOpen,
  setIsDetailModalOpen,
}: {
  customer: CustomerDataType;
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (v: boolean) => void;
}) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const handleCloseUpdateModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <Modal
      width={600}
      title={
        <>
          <Space size={"middle"}>
            <InfoCircleOutlined style={{ color: colorPrimary, fontSize: 18 }} />
            <span style={{ color: colorPrimary, fontSize: 16 }}>
              Chi tiết khách hàng
            </span>
          </Space>
          <Divider style={{ margin: "10px 0px 25px 0px" }} />
        </>
      }
      open={isDetailModalOpen}
      footer={
        <>
          <Divider style={{ margin: "25px 0px 10px 0px" }} />

          <Button type="primary" onClick={() => handleCloseUpdateModal()}>
            OK
          </Button>
        </>
      }
      onCancel={() => handleCloseUpdateModal()}
      centered
    >
      <Flex justify="space-between">
        <Flex justify="flex-start" gap={"middle"} vertical>
          <Space.Compact>
            <Input
              defaultValue={customer.fullName}
              disabled
              prefix={<UserOutlined style={{ padding: "0px 5px" }} />}
            />
            <Button>
              <CopyOutlined />
            </Button>
          </Space.Compact>

          <Space.Compact>
            <Input
              defaultValue={customer.address}
              disabled
              prefix={<UserOutlined style={{ padding: "0px 5px" }} />}
            />
            <Button>
              <CopyOutlined />
            </Button>
          </Space.Compact>
        </Flex>

        <Flex gap={"middle"} vertical>
          {customer.contacts?.map((contact: Contact) => {
            return (
              <Space.Compact>
                <Input
                  defaultValue={`${contact.name} - ${contact.phone}`}
                  disabled
                  prefix={<UserOutlined style={{ padding: "0px 5px" }} />}
                />
                <Button>
                  <CopyOutlined />
                </Button>
              </Space.Compact>
            );
          })}
        </Flex>
      </Flex>
    </Modal>
  );
}
