import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Checkbox, Dropdown, Image, Input, Slider, Space, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { getImage } from "../store/image/actions";
import { generateImg } from "../store/prompt/actions";
import { PromptState } from "./types";
 
export default function Form(): JSX.Element { 
  const initialState = {
    prompt: "",
    steps: 30,
    width: 512,
    height: 512,
    batch_count: 1,
    cfg_scale: 7,
    restore_faces: false
  }

  const { TextArea } = Input;
  const [settings, setSettings] = useState<PromptState>(initialState);
  const [latestImage, setLatestImage] = useState('');
  const [visible, setVisible] = useState<boolean>(false);
  const [methods, setMethods] = useState<string[]>([]);
  const [getModels, setGetModels] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const latestImageLink = useAppSelector(state => state.image.imageLink);

  async function getAllModels() {
    try {
      const resp = await axios.get<string[]>('http://localhost:8080/models');
      setGetModels(resp.data);
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
  
  let modelsList: any = getModels.map((model, index) => ({
    label: model,
    key: index.toString()
  }));

  let samplersList: any = methods.map((sampler, index) => ({
    label: sampler,
    key: index.toString()
  }));


  const models: MenuProps = { items: modelsList};
  const samplers: MenuProps = { items: samplersList};

  console.log(samplers);
  
  function inputHandler(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  function generate() {
    dispatch(generateImg(settings));
    dispatch(getImage());
  }

  useEffect(() => {
    setLatestImage(latestImageLink);
  }, [latestImageLink])

  return (
    <div>
      {/* Drop down for models */}
       <Dropdown menu={models} trigger={["click"]}>
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
        name="prompt"
        value={settings.prompt}
        onChange={inputHandler}
        placeholder="Enter yours prompt"
        rows={4} 
       />
        
       {/* slider for sampling steps */}
       <Slider 
          min={0} 
          max={150}
          defaultValue={30}
          onChange={(v) => setSettings({ ...settings, steps: v })}
        />
       
       {/* dropdown for sampling methods */}
       <Dropdown menu={samplers} trigger={["click"]}>
         <a onClick={(e) => e.preventDefault()}>
           <Space>
             Sampling Methods
             <DownOutlined />
           </Space>
         </a>
       </Dropdown>
       
       {/* check box for restore faces */}
       <Checkbox 
        onChange={() => setSettings({ ...settings, restore_faces: !settings.restore_faces })}
       >
        Restore Faces
       </Checkbox>

      <br />
       {/* slider for width */}
       <Typography.Text>
        Width
       </Typography.Text>
       <Slider 
        onChange={(v) => setSettings({ ...settings, width: v })}
        defaultValue={512} 
        min={256} 
        max={768}
       />
       
       {/* slider for height */}
       <Typography.Text>
        height
       </Typography.Text>
       <Slider 
        onChange={(v) => setSettings({ ...settings, height: v })}
        defaultValue={512} 
        min={256} 
        max={768}
       />

       {/* batch count */}
       <Typography.Text>
        Batch Count
       </Typography.Text>
       <Slider
        onChange={(v) => setSettings({ ...settings, batch_count: v })}
        defaultValue={1} 
        min={1} 
        max={5}
       />

      {/* CFG scale */}
      <Typography.Text>
        CFG Scale
       </Typography.Text>
       <Slider 
        onChange={(v) => setSettings({ ...settings, cfg_scale: v })}
        defaultValue={7} 
        min={1} 
        max={30} 
        step={0.5}
       />
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
            {latestImage && <Image src={`http://localhost:8080/images/${latestImage}`} />}
          </Image.PreviewGroup>
        </div>
        <Button onClick={getAllModels}>
          Get models
        </Button>
        <Button onClick={getAllMethods}>
          Get Methods
        </Button>
    </div>
  )

}
