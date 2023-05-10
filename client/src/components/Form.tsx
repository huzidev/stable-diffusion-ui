import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Input, Slider, Space } from "antd";

export default function Form() {
  const { TextArea } = Input;

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <div>
       <Dropdown menu={{ items }} trigger={["click"]}>
         <a onClick={(e) => e.preventDefault()}>
           <Space>
             Click me
             <DownOutlined />
           </Space>
         </a>
       </Dropdown>
       <TextArea rows={4} />
       <Slider defaultValue={30} min={0} max={150}/>
    </div>
  )
}
