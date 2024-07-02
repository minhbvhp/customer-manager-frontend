import { Contact, CustomerDataType } from "@/app/lib/definitions";
import { Modal, Button, Space, Divider, theme, Flex, Input } from "antd";
import {
  InfoCircleOutlined,
  CopyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CopyToClipboardInput from "@/app/components/Customers/CopyToClipboardInput";

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
            <span style={{ color: colorPrimary, fontSize: 16 }}>Chi tiết</span>
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
          <CopyToClipboardInput
            value={customer.fullName}
            prefixIcon={<UserOutlined style={{ padding: "0px 5px 0px 0px" }} />}
          />

          <CopyToClipboardInput
            value={customer.address}
            prefixIcon={<UserOutlined style={{ padding: "0px 5px 0px 0px" }} />}
          />
        </Flex>

        <Flex gap={"middle"} vertical>
          {customer.contacts?.map((contact: Contact) => {
            return (
              <CopyToClipboardInput
                value={`${contact.name} - ${contact.phone}`}
                prefixIcon={
                  <UserOutlined style={{ padding: "0px 5px 0px 0px" }} />
                }
              />
            );
          })}
        </Flex>
      </Flex>
    </Modal>
  );
}
