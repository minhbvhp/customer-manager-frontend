"use client";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

interface DataType {
  key: React.Key;
  fullName: string;
  taxCode: string;
  address: string;
}

function CustomerTable(customters: any) {
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

  const customersArray = JSON.stringify(customters);

  console.log(customters.customters[0]);

  // const data = customters.map((customer: any) => ({
  //   key: customer.id,
  //   name: customer.fullName,
  //   taxCode: customer.taxCode,
  //   address: customer.street,
  // }));

  return (
    <Table
      locale={{ emptyText: "Không tìm thấy khách hàng" }}
      columns={columns}
      // dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}

export default CustomerTable;
