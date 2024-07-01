"use client";
import { Contact, Customer } from "@/app/lib/definitions";
import { Button, Input, Space, Table, Badge, Avatar, Flex, App } from "antd";
import { useEffect, useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EyeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Link from "next/link";

interface DataType {
  key: string;
  fullName: string;
  taxCode: string;
  urn: string;
  address: string;
  contacts: Contact[];
}

export default function CustomerTable({
  customers,
}: {
  customers: Customer[];
}) {
  //#region hook
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    if (!customers) setIsLoading(true);
  }, [customers]);
  //#endregion

  //#region customer filter
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder="Tìm theo tên"
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "!#ffc069",
            padding: 0,
            color: "orange !important",
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //#endregion

  //#region column data

  type DataIndex = keyof DataType;

  const data: DataType[] = customers.map((customer: any) => ({
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

  const arrayAddress = customers.map((customer: any) => ({
    text: customer.ward.district.province.name,
    value: customer.ward.district.province.name,
  }));

  const key = "value";
  const addressFilter = [
    ...new Map(arrayAddress.map((item) => [item[key], item])).values(),
  ];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),
      render: (_: any, record: DataType) => (
        <Link href={`/dashboard/customers/${record.key}`}>
          {record.fullName}
        </Link>
      ),
    },
    {
      title: "Mã số thuế",
      dataIndex: "taxCode",
      ...getColumnSearchProps("taxCode"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      filters: addressFilter,
      onFilter: (value, record) =>
        record.address.indexOf(value as string) !== -1,
    },
    {
      title: "Người liên hệ",
      align: "center",
      dataIndex: "contacts",
      render: (_: any, record: DataType) => (
        <Badge
          count={record.contacts?.length}
          showZero
          color={record.contacts?.length > 0 ? "#52c41a" : "#faad14"}
        >
          <Avatar
            shape="square"
            style={{
              color: record.contacts?.length > 0 ? "#52c41a" : "#faad14",
              backgroundColor: "#f0f0f0",
            }}
            icon={<UserOutlined />}
          />
        </Badge>
      ),
    },
    {
      title: "Chi tiết",
      align: "center",
      render: (_: any, record: DataType) => (
        <EyeOutlined
          style={{ cursor: "pointer", color: "#8E3E63", fontSize: "16px" }}
          onClick={() => showMessage()}
        />
      ),
    },
  ];

  //#endregion

  //#region show customer's detail
  const { message } = App.useApp();

  const showMessage = () => {
    message.success("Success!");
  };

  // const showDetailModal = (record: DataType) => {
  //   modal.warning({
  //     title: "Chi tiết khách hàng",
  //     content: (
  //       <div>
  //         <p>{record.fullName}</p>
  //         <p>{record.address}</p>
  //         {/* {record.contacts.map((contact: Contact) => {
  //           return <p>{`${contact.name}: ${contact.phone}`}</p>;
  //         })} */}
  //       </div>
  //     ),
  //   });
  // };
  //#endregion

  return (
    <Table
      loading={isLoading}
      pagination={{ pageSize: 5 }}
      locale={{
        emptyText: "Không tìm thấy khách hàng",
        filterReset: "Xóa",
        filterConfirm: "Lọc",
      }}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
