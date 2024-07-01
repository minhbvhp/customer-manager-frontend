import { Contact, CustomerDataType } from "@/app/lib/definitions";
import { Modal, Button } from "antd";

export default function CustomerDetailModal({
  customer,
  isDetailModalOpen,
  setIsDetailModalOpen,
}: {
  customer: CustomerDataType;
  isDetailModalOpen: boolean;
  setIsDetailModalOpen: (v: boolean) => void;
}) {
  const handleCloseUpdateModal = () => {
    setIsDetailModalOpen(false);
  };

  return (
    <Modal
      title="Chi tiết khách hàng"
      open={isDetailModalOpen}
      footer={
        <Button type="primary" onClick={() => handleCloseUpdateModal()}>
          OK
        </Button>
      }
      onCancel={() => handleCloseUpdateModal()}
      centered
    >
      <p>{customer.fullName}</p>
      <p>{customer.address}</p>
      {customer.contacts.map((contact: Contact) => {
        return (
          <>
            <p>{contact.name}</p>
            <p>{contact.phone}</p>
          </>
        );
      })}
    </Modal>
  );
}
