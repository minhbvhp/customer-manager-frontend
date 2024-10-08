"use client";
import { Customer, CustomerDataType } from "@/app/lib/definitions";
import { Button, Input, Space, Table, theme } from "antd";
import { useEffect, useRef, useState } from "react";
import type { FilterDropdownProps } from "antd/es/table/interface";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Link from "next/link";
import CustomerDetailModal from "@/app/components/Customers/CustomerDetailModal";

export default function CustomerReportTable({
  customers,
}: {
  customers: Customer[];
}) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  //#region hook
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerDataType>({
    key: "",
    customerId: "",
    fullName: "",
    taxCode: "",
    urn: "",
    address: "",
    contacts: [],
  });
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
  ): TableColumnType<CustomerDataType> => ({
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
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
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

  type DataIndex = keyof CustomerDataType;

  const data: CustomerDataType[] = customers.map((customer: any) => ({
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
        <DeleteOutlined
          style={{ cursor: "pointer", color: colorPrimary, fontSize: "16px" }}
          onClick={() => {
            showCustomerDetail(record);
          }}
        />
      ),
    },
  ];

  //#endregion

  //#region show customer's detail
  const showCustomerDetail = (record: CustomerDataType) => {
    setCustomer(record);
    setIsDetailModalOpen(true);
  };
  //#endregion

  return (
    <>
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

      <CustomerDetailModal
        customer={customer}
        setIsDetailModalOpen={setIsDetailModalOpen}
        isDetailModalOpen={isDetailModalOpen}
      />
    </>
  );
}
