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
    let doc = new jsPDF();

    doc.addFileToVFS("times-normal.ttf", FONTS.TIMES_FONT_NORMAL);
    doc.addFont("times-normal.ttf", "times", "normal");

    doc.addFileToVFS("timesbd-bold.ttf", FONTS.TIMES_FONT_BOLD);
    doc.addFont("timesbd-bold.ttf", "timesbd", "bold");

    doc.addFileToVFS("timesi-normal.ttf", FONTS.TIMES_FONT_ITALIC);
    doc.addFont("timesi-normal.ttf", "timesi", "normal");

    const pageWidth = 210;
    const pageHeight = 297;
    const pageMargin = 20;
    const afterSpacing = 1;
    const maxLengthPerLine = 200;

    let yPos = pageMargin + 20;
    let xPos = pageMargin;

    doc
      .setFont("timesbd", "bold")
      .setFontSize(28)
      .text("DANH SÁCH KHÁCH HÀNG", pageWidth / 2, pageMargin, {
        align: "center",
      });

    const groupByProvince = Object.groupBy(
      customerOnReport,
      ({ ward }) => ward.district.province.name
    );

    for (const [province, customers] of Object.entries(groupByProvince)) {
      if (customers) {
        //Group province
        if (yPos >= pageHeight - pageMargin - 10) {
          doc.addPage();
          yPos = pageMargin; // Restart height position
        }

        let text = `* Khu vực: ${province}`;
        let splittedText = doc.splitTextToSize(text, maxLengthPerLine);
        let lines = splittedText.length;

        let lineHeight =
          doc
            .setFont("timesbd", "bold")
            .setFontSize(20)
            .setTextColor("blue")
            .text(splittedText, xPos, yPos)
            .getLineHeight() / doc.internal.scaleFactor;

        let blockHeight = lines * lineHeight;
        yPos += blockHeight + afterSpacing;

        let count = 0;
        //Customer
        customers.forEach((customer) => {
          if (yPos >= pageHeight - pageMargin - 10) {
            doc.addPage();
            yPos = pageMargin; // Restart height position
          }

          count++;

          //Customer name
          let text = `${count}. ${customer.fullName}`;
          let splittedText = doc.splitTextToSize(text, maxLengthPerLine);
          let lines = splittedText.length;

          let lineHeight =
            doc
              .setFont("timesbd", "bold")
              .setFontSize(16)
              .setTextColor("black")
              .text(splittedText, xPos, yPos)
              .getLineHeight() / doc.internal.scaleFactor;

          let blockHeight = lines * lineHeight;
          yPos += blockHeight + afterSpacing;

          //Customer address
          text = customer.street
            ? `${customer.street}, ${customer.ward.name}, ${customer.ward.district.name}, ${customer.ward.district.province.name}`
            : `${customer.ward.name}, ${customer.ward.district.name}, ${customer.ward.district.province.name}`;
          splittedText = doc.splitTextToSize(text, maxLengthPerLine);
          lines = splittedText.length;

          lineHeight =
            doc
              .setFont("times", "normal")
              .setFontSize(14)
              .setTextColor("black")
              .text(splittedText, xPos, yPos)
              .getLineHeight() / doc.internal.scaleFactor;

          blockHeight = lines * lineHeight;
          yPos += blockHeight + afterSpacing;

          //Customer contacts

          customer.contacts.forEach((contact) => {
            text = `${contact.name} - ${contact.phone}`;
            splittedText = doc.splitTextToSize(text, maxLengthPerLine);
            lines = splittedText.length;

            lineHeight =
              doc
                .setFont("timesi", "normal")
                .setFontSize(12)
                .setTextColor("black")
                .text(splittedText, xPos, yPos)
                .getLineHeight() / doc.internal.scaleFactor;

            blockHeight = lines * lineHeight;
            yPos += blockHeight;
          });

          yPos += 5;
        });

        yPos += 5;
      }
    }

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
