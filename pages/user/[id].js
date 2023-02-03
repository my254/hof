import { Avatar, Button, Chip, Container, Overlay, Tabs, Text, useMantineTheme,Drawer,TextInput,NumberInput, ScrollArea, Group, LoadingOverlay,Select, Loader } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { forwardRef, useEffect, useState } from 'react'
import UserCardImage from '../../components/About'
import ProductS from '../../components/Manage'
import UserButton from '../../components/UserItem'
import { useForm } from "@mantine/form";
import BaseDemo from '../../components/ImageH'
import  Router, { useRouter }  from 'next/router'
import app from '../../database/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { arrayUnion, collection, getDocs, getFirestore, query, setDoc, where,doc, orderBy, onSnapshot, limit, startAfter, getDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import {
  IconNotification,
  IconUser,
  IconPlus,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
  IconSun, IconMoon, IconSearch, IconHome, IconDashboard, IconFileText, IconShoppingCart, IconToolsKitchen, IconHeartHandshake, IconShirt, IconEmpathize, IconShirtSport, IconDiamond, IconMasksTheater, IconStars, IconHomeCog, IconKey, IconLoader
} from "@tabler/icons"
import Head  from 'next/head'
import FeaturesCard from '../../components/Product'


const Product = () => {
  const router = useRouter()
  const { id } = router.query
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [opened,setOpened] = useState(false)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const [images,setImages] = useState([])
  const [user, loadingA, error] = useAuthState(auth);
  const [cat,setCat] = useState('')
  const [search,setSearch] = useState("")
  const [x,setX] = useState(null)
  const [l,setL] = useState(false)
  const [data,setData] = useState({
    name:'',
    dp:'',
    hero:'',
    description:''
  })
  const form = useForm({
    initialValues: {
      name: null,
      description:null,
      price:null,
      category:null,
      quantity:null,
      discount:null,
    },
  });
  const SelectItem = forwardRef(
    ({ icon, label, description, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar>
            {icon}
          </Avatar>
  
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  )
  const getP = e => {
    setSearch(e)
    setL(true)
    if(search.length > 10){
     getDoc(doc(db,"products",search)).then(results => {
      if(results.exists()){
        setX(results.data())
      }else{
        showNotification({
          title:'NOT FOUND',
          message:'Try to look for something else.'
        })
        setL(false)
      }
     })
    }
  }
  const mockdata = [
    {
      icon: <IconDiamond />,
      value:'Jewelery',
      label: "Jewelery",
      description: "Earings,Necklaces,Bangles,Waist beads,Anklelets,Checkers"
    },
    {
      icon: <IconShirt />,
      value:'Fabrics',
      label: "Fabrics",
      description: "Masai shawls ( shuka ),African swahili sarongs (kikoi),Ankara bags"
    },
    {
      icon: <IconMasksTheater />,
      value:'Traditional Artifacts',
      label: "Traditional Artifacts",
      description: "Clubs,(Rungus),Antique wooden masks,animal carvings (wooden ,soap stones)"
    },
    {
      icon: <IconStars/>,
      value:'Decors',
      label: "Decors",
      description: "Planter baskets,Paintings"
    },
    {
      icon: <IconHomeCog/>,
      value:'Home',
      label: "Home",
      description: "Dining table runners,dining table placemats,coasters,seviette holders ( beaded,wooden,soapstone ),coffe tables,outdoor benches,salad servers,salad bawls"
    },
    {
      icon: <IconKey/>,
      value:'Accessories',
      label: "Accessories",
      description: "Keyholders,Fridge magnets,Bottle openers"
    }
  ]
  const [progress,setProgress] = useState({
    i:'',
    total:'',
    upload:''
  })
  const [adding,setAdding] = useState(false)
  const add = async () => {
    setAdding(true)
    const id = uuid()
   
     
    var body = new FormData()
    if(images.length !== 0){
      images.map( imageFile => {      
      body.append('file',imageFile)
    })     
  }
  console.log(body)
    axios({
      method: "POST",
      data:body,
      url: `/api/base64`, // route name
      onUploadProgress: progress => {
        const { total, loaded } = progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        setProgress({
            i:uploadPercentage.toFixed(2),
            total:totalSizeInMB,
            uploaded:loadedSizeInMB
        })
      },
    }).then( res => {
      console.log(res.data)
      setDoc(doc(db,"products",id),{
        ...form.values,
        user:{
          ...data,
        },
        date:new Date(),
        author:user.uid,
        images:[...res.data.data]
      }).then( done => {
        setImages([])
        setAdding(false)
        setOpened(false)
        showNotification({
          title:'Upload Complete',
          message:'Product was added to your inventory.',
          color:'gray'
        })
        
      } ).catch( err => {
        showNotification({
          title:'Upload Failed',
          message:'Product was NOT added to your inventory.',
          color:'red'
        })
      } )
    } ).catch( err => {
      showNotification({
        title:'Upload Failed',
        message:'Product was NOT added to your inventory.',
        color:'red'
      })
    } )
  }
  const [fetch,setF] = useState(false)
  const fetchUser = async () => {
    setF(true)
    try {
      const q = query(collection(db,"users"),where("uid", "==", id))
     const query_r = await getDocs(q);
     setData({name:query_r.docs[0].data()?.name,dp:query_r.docs[0].data()?.dp,hero:query_r.docs[0].data()?.hero,description:query_r.docs[0].data()?.description})
     
    } catch (err) {
      console.error(err);
     
    }
    setF(false)
  }
  const [assets,setNotifs] = useState([])
  const [start,setStart] = useState(null)
  const [getting,setGetting] = useState(false)
  const get = () => {
    const ref4 = (id === "hcPzeL6ejYNv9aszafkivYi9G3C3" ? query( collection(db,"products"),orderBy('date','desc'),limit(6)) : query( collection(db,"products"),where('author','==',id),orderBy('date','desc'),limit(6)))
    onSnapshot(ref4,(collection_) => {

         let items = []
         collection_.forEach(document => {
             let doc = document.data()
             doc.id = document.id
             items.push(doc)
             setStart(doc.date)
         });
         setNotifs(items)
     }); 
   }
   const getNext = () => {
    console.log(start)
    if(start){
      setGetting(true)
      const ref4 = (id === "hcPzeL6ejYNv9aszafkivYi9G3C3" ? query( collection(db,"products"),orderBy("date","desc"),startAfter(start),limit(6)) : query( collection(db,"products"),where('author','==',id),orderBy("date","desc"),startAfter(start),limit(6)))
      getDocs(ref4).then(result => {
      if(!result.empty){
        let items = []
        result.forEach(document => {
            let doc = document.data()
            doc.id = document.id
            items.push(doc)
            setStart(doc.date)
        });
         console.log(items)
        setNotifs(prev => [...prev,...items])
      }
      })
      
    }else{
      showNotification({
       title:"Up To Date",
       message:'You have viewed all.'
      })
    }
    setGetting(false)
   }
  useEffect(() => {
    if(id){
      fetchUser()
      get()
    }

  },[])

  return (
    <div style={{marginTop:80}}>
      <Head>
        <title>
          {
            fetch ? "Loading ..." : data.name
          }
        </title>
      </Head>
    {
      data.hero  ? 
      <Container style={{height:200,display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'center',gap:10,padding:20,backgroundImage:`url(${data.hero})`,backgroundPosition:'center',backgroundSize:'cover'}}>
      <Avatar  radius={80} size={150} style={{ border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`}} src={data.dp} />
      </Container>:(
         <Container style={{height:200,display:'flex',flexDirection:"column",alignItems:'center',justifyContent:'center',gap:10,padding:20,backgroundColor:'whitesmoke',backgroundPosition:'center',backgroundSize:'cover'}}>
         <Avatar  radius={80} size={150} style={{ border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`}} src={data.dp} />
         </Container>
      )
    }
    <Container>
      <UserButton name={data.name} dp={data.dp} email={user && user.email } image="/1.jpg" />
    </Container>
    <Container style={{padding:10}}>
    <Tabs defaultValue="about" variant='pills' orientation={mobile ? 'horizontal' : 'vertical'}>
      <Tabs.List>
        <Tabs.Tab icon={<IconUser />} value="about">About Store</Tabs.Tab>
        <Tabs.Tab icon={<IconShoppingCart />} value="Manage">Store Front</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="about">
        <div style={{padding:10,paddingTop:mobile ? 10 : 0,paddingRight:mobile ? 0 : 10,paddingLeft: mobile ? 0 : 10}}>
         <UserCardImage name={data.name} hero={data.hero} dp={data.dp} reset={setData} data={data}/>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value="Manage">
      
      <div style={{padding:10,paddingTop:mobile ? 10 : 0,paddingRight:mobile ? 0 : 10,paddingLeft: mobile ? 0 : 10}}>
      <TextInput  icon={l ? <Loader size="sm"/> : <IconSearch />} value={search} m={10} onChange={(e) => getP(e.currentTarget.value)} placeholder="Enter Product id to view product.."/>
        {
          x &&
          <FeaturesCard data={x}/>
        }
       {
        user?.uid === id && 
        <Button
        fullWidth
        radius="sm"
        m={10}
        size="sm"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
        leftIcon={<IconPlus />}
        onClick={() => setOpened(true)}
       
      >
      Add New Product
      </Button>
       }
        <ProductS  products={assets}/>
        <Group position='center'>
          <Button variant="light" onClick={getNext} loading={getting} leftIcon={<IconLoader />}>
            Load More
          </Button>
        </Group>
        </div>
        <Drawer
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add product"
        padding="xl"
        size="xl"
        style={{overFlowY:'auto'}}
      >
        { adding &&  <LoadingOverlay />}
        <Button leftIcon={<IconPlus />}  disabled={!form.values.name || !form.values.description || !form.values.category || !form.values.price || !form.values.quantity || images.length === 0 ? true : false } fullWidth mt={10} mb={10} loading={adding} onClick={add}>
              Add product
            </Button>
            <ScrollArea style={{height:'90%',width:'100%',paddingBottom:10}} offsetScrollbars>
            <div style={{marginTop:10,width:'100%'}}>
        <BaseDemo images={images} setImages={setImages}/>
      </div>
      
         
        <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <Select
     label="Category" placeholder="Category" 
      itemComponent={SelectItem}
      data={mockdata}
      searchable
      maxDropdownHeight={300}
      nothingFound="Nothing here"
      {...form.getInputProps('category')}
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
      <TextInput withAsterisk mt="md"  label="Description" placeholder="Product Description" {...form.getInputProps('description')} />
      <NumberInput
      mt="md"
      withAsterisk
     {...form.getInputProps('quantity')}
      label="Quantity"
      defaultValue={1}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value))
          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : ''
      }
    />
      <NumberInput
      mt="md"
      withAsterisk
      {...form.getInputProps('price')}
      label="Price"
      defaultValue={10}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value))
          ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '$ '
      }
    />
      <TextInput mt="md" label="Discount" placeholder="25% off 12,000" {...form.getInputProps('discount')} />
        </ScrollArea>
      </Drawer>
      </Tabs.Panel>
    </Tabs>
    </Container>
    </div>
  )
}

export default Product