import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Checkbox, Dropdown, Image, Input, Slider, Space, Typography } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import axios from "axios";
import { useEffect, useState } from "react";
import { generateImg } from "../store/form/data";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getImage } from "../store/image/getImage";
import { DataType } from "./Types";
 
export default function Form(): JSX.Element {
  const { TextArea } = Input;
  const [prompt, setPrompt] = useState<DataType>({ prompts: "" });
  const [latestImage, setLatestImage] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [methods, setMethods] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const latestImageLink = useAppSelector(state => state.image.imageLink);

  useEffect(() => {
    dispatch(getImage());
    // dispatch(imageAction.testImag());
    setLatestImage(latestImage);
  }, [])
  
  useEffect(() => {
    setLatestImage(latestImageLink);
  }, [latestImageLink])

  console.log("latest Image", latestImageLink); 

  // async function getLatestImage() {
  //   try {
  //     const response = await axios("http://localhost:8080/latest-img");
  //     const data = response.data;
  //     setLatestImage(data.image);
  //   } catch (e) {
  //     console.log("Error", e);
  //   }
  // }

  // useEffect(() => {
  //   getLatestImage()
  // }, [])

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

  function generate() {
    dispatch(generateImg(prompt));
  }

  async function getAllModels() {
    try {
      const resp = await axios.get<string[]>('http://localhost:8080/models');
      setModels(resp.data);
    } catch (e) {
      console.log("Error", e);
    }
  }
  
  async function getAllMethods() {
    try {
      const resp = await axios.get<string[]>('http://localhost:8080/methods');
      setMethods(resp.data);
    } catch (e) {
      console.log("Error", e);
    }
  };


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
       {latestImage &&
        <Image
            preview={{ visible: false }}
            width={200}
            src={`http://localhost:8080/images/${latestImage}`}
            onClick={() => setVisible(true)}
          />
       }
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis)}}>
            {/* <Image src="/images/1684145516113.png" /> */}
            {latestImage && <Image src={`http://localhost:8080/images/${latestImage}`} />}
          </Image.PreviewGroup>
        </div>
        <Button onClick={getAllModels}>
          Get models
        </Button>
        <Button onClick={getAllMethods}>
          Get Methods
        </Button>
        {/* <Button onClick={test}>
          Run this
        </Button> */}
    </div>
  )

}
