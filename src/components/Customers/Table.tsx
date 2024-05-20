"use client";
import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  taxCode: string;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Khách hàng",
    dataIndex: "name",
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
    onFilter: (value, record) => record.address.indexOf(value as string) !== -1,
  },
];

const data = [
  {
    key: "1",
    name: "Công ty Bảo Việt Hải Phòng",
    taxCode: "123456-3",
    address: "24 Điện Biên Phủ, Ngô Quyền, Hải Phòng",
  },
  {
    key: "2",
    name: "Tổng Công ty Bảo hiểm Bảo Việt",
    taxCode: "123456",
    address: "Số 7 Lý Thường Kiệt, Hà Nội",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const CustomerTable: React.FC = () => (
  <Table
    locale={{ emptyText: "Không tìm thấy khách hàng" }}
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{ target: "sorter-icon" }}
  />
);

export default CustomerTable;
