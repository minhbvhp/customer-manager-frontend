"use client";
import { Button } from "antd";
import { jsPDF } from "jspdf";

function GeneratePDF() {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "pt", "a4", false);
    // do whatever you want in your pdf and finally save your pdf
    await doc.save("mypdf.pdf");
  };

  return;
  <Button type="primary" htmlType="submit" onClick={handlePDF}>
    Generate PDF
  </Button>;
}
