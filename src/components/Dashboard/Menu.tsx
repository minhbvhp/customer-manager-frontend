"use client";
import {
  UserOutlined,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
  {
    key: "/dashboard",
    label: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    key: "/dashboard/customers",
    label: "Khách hàng",
    icon: <UserOutlined />,
  },
  {
    key: "/dashboard/policies",
    label: "Đơn bảo hiểm",
    icon: <FileTextOutlined />,
  },
];

const DashboardMenu: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [current, setCurrent] = useState(
    pathname === "/" || pathname === "" ? "/dashboard" : pathname
  );

  function handleClick(e: any) {
    router.push(e.key);
  }

  useEffect(() => {
    if (pathname) {
      if (current !== pathname) {
        setCurrent(pathname);
      }
    }
  }, [pathname, current]);

  return (
    <Menu
      mode="inline"
      items={items}
      selectedKeys={[current]}
      onClick={handleClick}
    />
  );
};

export default DashboardMenu;
