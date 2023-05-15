import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Checkbox, Dropdown, Image, Input, Slider, Space, Typography } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from "react";
import { generateImg } from "../store/form/data";
import { useAppDispatch } from "../store/hooks/hooks";
import { DataType } from "./Types";
 
export default function Form(): JSX.Element {
  const { TextArea } = Input;
  const [prompt, setPrompt] = useState<DataType>({ prompts: "" });
  const [latestImage, setLatestImage] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    
  }, [])

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    }
  ];

  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setPrompt({
      ...prompt,
      [e.target.name]: e.target.value
    });
  };

  const { prompts } = prompt;

  async function generate() {
    dispatch(generateImg(prompt));
  }

  return (
    <div>
      {/* Drop down for models */}
       <Dropdown menu={{ items }} trigger={["click"]}>
         <a onClick={(e) => e.preventDefault()}>
           <Space>
             Select Models
             <DownOutlined />
           </Space>
         </a>
       </Dropdown>
       
       {/* Generate Image button */}
      <Button type="primary" size={'large'}>
        Generate
      </Button>
       
       {/* text area for prompts */}
       <TextArea 
        name="prompts"
        value={prompts}
        onChange={inputHandler}
        placeholder="Enter yours prompt"
        rows={4} 
       />
       
       {/* slider for sampling steps */}
       <Slider defaultValue={30} min={0} max={150}/>
       
       {/* dropdown for sampling methods */}
       <Dropdown menu={{ items }} trigger={["click"]}>
         <a onClick={(e) => e.preventDefault()}>
           <Space>
             Sampling Methods
             <DownOutlined />
           </Space>
         </a>
       </Dropdown>
       
       {/* check box for restore faces */}
       <Checkbox onChange={onChange}>
        Restore Faces
       </Checkbox>

      <br />
       {/* slider for width */}
       <Typography.Text>
        Width
       </Typography.Text>
       <Slider defaultValue={512} min={256} max={768}/>
       
       {/* slider for height */}
       <Typography.Text>
        height
       </Typography.Text>
       <Slider defaultValue={512} min={256} max={768}/>

       {/* batch count */}
       <Typography.Text>
        Batch Count
       </Typography.Text>
       <Slider defaultValue={1} min={1} max={5}/>

      {/* CFG scale */}
      <Typography.Text>
        CFG Scale
       </Typography.Text>
       <Slider defaultValue={7} min={1} max={30} step={0.5}/>
       <Button onClick={generate}>
        Generate Image
       </Button>
       <Image
          preview={{ visible: false }}
          width={200}
          src="/images/1684145516113.png"
          onClick={() => setVisible(true)}
        />
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis)}}>
            <Image src="/images/1684145516113.png" />
          </Image.PreviewGroup>
        </div>
    </div>
  )

}
