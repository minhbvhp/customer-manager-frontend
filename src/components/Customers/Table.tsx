"use client";
import { Customer } from "@/app/lib/definitions";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
interface DataType {
  key: React.Key;
  fullName: string;
  taxCode: string;
  address: string;
}

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!customers) setIsLoading(true);
  }, [customers]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Khách hàng",
      dataIndex: "fullName",
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      filters: [
        {
          text: "Hải Phòng",
          value: "Hải Phòng",
        },
        {
          text: "Hà Nội",
          value: "Hà Nội",
        },
        {
          text: "TP. Hồ Chí Minh",
          value: "TP. Hồ Chí Minh",
        },
      ],
      onFilter: (value, record) =>
        record.address.indexOf(value as string) !== -1,
    },
  ];

  const data = customers.map((customer: any) => ({
    key: customer.id,
    fullName: customer.fullName,
    taxCode: customer.taxCode,
    address: customer.street
      ? `${customer.street}, ${customer.ward.fullName}, ${customer.ward.district.fullName}, ${customer.ward.district.province.fullName}`
      : `${customer.ward.fullName}`,
  }));

  return (
    <Table
      loading={isLoading}
      pagination={{ pageSize: 5 }}
      locale={{ emptyText: "Không tìm thấy khách hàng" }}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
