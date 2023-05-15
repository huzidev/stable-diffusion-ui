import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Checkbox, Dropdown, Image, Input, Slider, Space, Typography } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from "react";
import { generateImg } from "../store/form/data";
import { useAppDispatch } from "../store/hooks/hooks";
import { getModels } from "../store/models/models";
import { DataType } from "./Types";
 
export default function Form(): JSX.Element {
  const { TextArea } = Input;
  const [prompt, setPrompt] = useState<DataType>({ prompts: "" });
  const [latestImage, setLatestImage] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("http://localhost:8080/latest-img")
      .then((response) => response.json())
      .then((data) => {
        setLatestImage(data.image);
      });
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

  function generate() {
    dispatch(generateImg(prompt));
  }

  function getAllModels() {
    dispatch(getModels());
  }

  console.log("image", `http://localhost:8080/images/${latestImage}`);
  
  let arrText = [ 
    {
      title: 'protogenX58RebuiltScifi_10.safetensors [6a21b428a3]',
      model_name: 'protogenX58RebuiltScifi_10',
      hash: '6a21b428a3',
      sha256: '6a21b428a3fb7286f024f958c761ea1a36a5061c3d3c1eb6a815c88af0e97cb0',
      filename: 'D:\\stable-diffusion\\stable-diffusion-webui\\models\\Stable-diffusion\\protogenX58RebuiltScifi_10.safetensors',
      config: null
    },
    {
      title: 'realisticVisionV20Fp16.Or1n.safetensors [c0d1994c73]',
      model_name: 'realisticVisionV20Fp16.Or1n',
      hash: 'c0d1994c73',
      sha256: 'c0d1994c73d784a17a5b335ae8bda02dcc8dd2fc5f5dbf55169d5aab385e53f2',
      filename: 'D:\\stable-diffusion\\stable-diffusion-webui\\models\\Stable-diffusion\\realisticVisionV20Fp16.Or1n.safetensors',
      config: null
    },
    {
      title: 'redshift-diffusion-v1.ckpt [ed8c2ee432]',
      model_name: 'redshift-diffusion-v1',
      hash: 'ed8c2ee432',
      sha256: 'ed8c2ee43268932a420f5db00b105881770a19c0afd0d35876330e2bbdcce426',
      filename: 'D:\\stable-diffusion\\stable-diffusion-webui\\models\\Stable-diffusion\\redshift-diffusion-v1.ckpt',
      config: null
    }
  ]

  let newObj: any = {};
  arrText.forEach((element: any) => {
    for (let key in element) {
        if (key === "model_name") {
          newObj[key] = element[key]
          newObj = {...newObj}
        }
      }
    })

    console.log("new obj", newObj);
    
    
  

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
            // src={`http://localhost:8080/uploads/${latestImage}`}
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
    </div>
  )

}
