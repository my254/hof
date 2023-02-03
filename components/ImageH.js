import { useEffect, useRef, useState } from "react"
import { FileButton, Button, Group, Text,Modal,Image } from "@mantine/core"
import {  Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import { v4 as uuidv4 } from 'uuid'
import { Carousel } from "@mantine/carousel";
import { IconTrash, IconUpload } from "@tabler/icons";

export default function Demo({images,setImages}) {
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [show,setShow] = useState(false)
  const cropperRef = useRef()
  const crop = () => {
    //console.log(preview,cropperRef.current?.getCanvas().toDataURL())
    if(cropperRef.current?.getCanvas()){
      let data = {
        imageBase64:cropperRef.current?.getCanvas().toDataURL(),
        fullName:uuidv4(),
        id:uuidv4()
      }
      setFiles(prev => [...prev,data])
      //function to convert base64 string to blob file
    function urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }
    
    //Usage example:
    urltoFile(data.imageBase64,data.fullName,'image/png')
    .then(function(fileN){ 
      console.log(fileN)
      setImages(prev => [...prev,fileN])
    });
   
    
   
    setShow(false)
    }
  }
  useEffect(() => {
  if(file){
    setShow(true)
  }
  },[file])
  return (
    <div style={{width:'100%'}}>
      <Group position="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {props => <Button fullWidth leftIcon={<IconUpload />} variant="subtle" {...props}>Upload image</Button>}
        </FileButton>
      </Group>
      {files.length > 0 && (
       <Group position="start" mt={10}>
         {
           files.map((item) => (
          <div key={item.id}>
            <Button mb={5} size="xs" leftIcon={<IconTrash />} onClick={() => { setFiles(prev =>  prev.filter((i) => i.id !== item.id )) }}>
              remove
            </Button>
              <Image
            
            width={100}
            height={100}
          radius="md"
          src={item.imageBase64}
          alt="product image"
       />
          </div>
        ))
         }
       </Group>
      )}
      <Modal
        opened={show}
        onClose={() => setShow(false)}
        title="Lets crop"
      >
        <Group position="center" style={{padding:10}}>
        <Button onClick={crop}>
            Lets Crop
        </Button>
      </Group>
        {/* Modal content */}
      {
        file && (
            <Cropper
            ref={cropperRef}
            src={URL.createObjectURL(file)}
            className={'cropper'}
            stencilProps={{
                grid:true,
                resizable:false
            }}
            stencilSize={{
                width:350,
                height: 200
            }}
            />
        )
      }
      </Modal>
    </div>
  )
}
