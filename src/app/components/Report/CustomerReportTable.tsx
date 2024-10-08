"use client";
import { Customer, CustomerDataType } from "@/app/lib/definitions";
import { Button, Divider, Table, theme } from "antd";
import { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import { FONTS } from "@/app/lib/fonts";

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
    const doc = new jsPDF("p", "pt", "a4");

    const pageHeight = 842;
    const pageWidth = 595;
    const pageMargin = 50;

    let startX = pageMargin;
    let startY = pageMargin + 50;

    doc.addFileToVFS("times-normal.ttf", FONTS.TIMES_FONT_NORMAL);
    doc.addFont("times-normal.ttf", "times", "normal");

    doc.addFileToVFS("timesbd-bold.ttf", FONTS.TIMES_FONT_BOLD);
    doc.addFont("timesbd-bold.ttf", "timesbd", "bold");

    doc.addFileToVFS("timesi-normal.ttf", FONTS.TIMES_FONT_ITALIC);
    doc.addFont("timesi-normal.ttf", "timesi", "normal");

    doc.text("DANH SÁCH KHÁCH HÀNG", pageWidth / 2, pageMargin, {
      align: "center",
    });

    customerOnReport.forEach((customer) => {
      if (startY >= pageHeight - pageMargin) {
        doc.addPage();
        startY = pageMargin; // Restart height position
      }

      doc.setFont("timesbd");
      doc.text(`${customer.fullName}`, startX, startY, {
        maxWidth: pageWidth - pageMargin,
      });
      startY += 30;

      doc.setFont("times");
      doc.text(
        `${customer.street}, ${customer.ward.fullName}, ${customer.ward.district.fullName}, ${customer.ward.district.province.fullName}`,
        startX,
        startY,
        { maxWidth: pageWidth - pageMargin }
      );
      startY += 30;

      doc.setFont("timesi");
      doc.text(`${customer.taxCode}`, startX, startY, {
        maxWidth: pageWidth - pageMargin,
      });

      var nextPosX = startX;

      if (nextPosX > pageWidth) {
        startX = pageMargin;
        startY += 50;
      } else {
        startX = nextPosX;
      }

      startY += 50;
    });

    doc.save("Khach hang.pdf");
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
