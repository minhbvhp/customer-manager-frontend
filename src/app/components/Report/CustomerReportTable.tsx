"use client";
import { Customer, CustomerDataType } from "@/app/lib/definitions";
import { Button, Divider, Table, theme } from "antd";
import { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

export default function CustomerReportTable({
  customers,
}: {
  customers: Customer[];
}) {
  //#region hook
  const [isLoading, setIsLoading] = useState(false);
  const [customerOnReport, setCustomerOnReport] = useState(customers);

  useEffect(() => {
    setCustomerOnReport(customers);
  }, []);

  useEffect(() => {
    if (!customers) {
      setIsLoading(true);
    } else {
      setCustomerOnReport(customers);
    }
  }, [customers]);
  //#endregion

  //#region column data

  const data: CustomerDataType[] = customerOnReport.map((customer: any) => ({
    key: `customer-key-${customer.id}`,
    customerId: customer.id,
    fullName: customer.fullName,
    taxCode: customer.taxCode,
    address: customer.street
      ? `${customer.street}, ${customer.ward.fullName}, ${customer.ward.district.fullName}, ${customer.ward.district.province.fullName}`
      : `${customer.ward.fullName}, ${customer.ward.district.fullName}, ${customer.ward.district.province.fullName}`,
    contacts: customer.contacts,
    urn: customer.urn,
  }));

  const columns: TableColumnsType<CustomerDataType> = [
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Thao tác",
      align: "center",
      render: (_: any, record: CustomerDataType) => (
        <MinusCircleOutlined
          style={{ cursor: "pointer", color: "orangered", fontSize: "16px" }}
          onClick={() => {
            removeCustomerFromReport(record);
          }}
        />
      ),
    },
  ];

  //#endregion

  //#region show customer's detail
  const removeCustomerFromReport = (record: CustomerDataType) => {
    const _customersAfterCustomRemove = customerOnReport.filter(
      (c) => c.id !== record.customerId
    );

    setCustomerOnReport(_customersAfterCustomRemove);
  };

  function exportToPDF(): void {
    console.log(customerOnReport);
  }

  //#endregion

  return (
    <>
      <Button
        type="primary"
        onClick={() => exportToPDF()}
        style={{ width: 150 }}
      >
        Xuất báo cáo
      </Button>

      <Table
        loading={isLoading}
        pagination={false}
        locale={{
          emptyText: "Không tìm thấy khách hàng",
          filterReset: "Xóa",
          filterConfirm: "Lọc",
        }}
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </>
  );
}
