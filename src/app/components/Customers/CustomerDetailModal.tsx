import { Customer } from "@/app/lib/definitions";
import { Modal } from "antd";

export default function CustomerDetailModal({
  customer,
}: {
  customer: Customer;
}) {
  return (
    <Modal
      title="Chi tiết khách hàng"
      //  open={isUpdateModalOpen}
    >
      <p>Hello</p>
    </Modal>
  );
}
