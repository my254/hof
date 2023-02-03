import { Carousel } from "@mantine/carousel"
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    createStyles,
    Center,
    Button,
    UnstyledButton,
    Avatar,
    Title,
    Drawer,
    ScrollArea,
    Modal,
    NumberInput,TextInput,Select, Divider
  } from "@mantine/core"
import { useId, useLocalStorage, useMediaQuery } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
  import {
    IconGif,
    IconNumber, IconShoppingCartPlus,
  } from "@tabler/icons"
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
import axios from "axios"
import { getAuth } from "firebase/auth"
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"
import { useEffect, useState,forwardRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import app from "../database/Firebase"
import { v4 as uuid } from "uuid"
import ContactUsButton from "./ProductMail"
import { useForm } from "@mantine/form"

  
  const useStyles = createStyles(theme => ({
    card: {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        transition: 'transform 150ms ease, box-shadow 150ms ease',

        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: theme.shadows.md,
        },
    },
  
    imageSection: {
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`
    },
  
    label: {
      marginBottom: theme.spacing.xs,
      lineHeight: 1,
      fontWeight: 700,
      fontSize: theme.fontSizes.xs,
      letterSpacing: -0.25,
      textTransform: "uppercase"
    },
  
    section: {
      padding: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`
    },
  
    icon: {
      marginRight: 5,
      color:
        theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5]
    },
    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0]
      }),
  
      "&:active": theme.activeStyles
    },
  }))
  
  
  export default function FeaturesCard({data,admin}) {
    const regex = '/[\[\]"]+/g'
    const auth = getAuth(app)
    const [user, loadingA, error] = useAuthState(auth);
    const db = getFirestore(app)
    const { classes,theme } = useStyles()
    const [removing,setR] = useState(false)
    const [value, setValue] = useLocalStorage({ key: 'shopping-cart', defaultValue:[]});
    const [value_, setValue_] = useLocalStorage({ key: 'wish-cart', defaultValue:[]});
    const [value_total, setValueTotal] = useLocalStorage({ key: 'shopping-cart-totals', defaultValue:0});
    const [open,SetOpen] = useState(false)
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
    const [last,setLast] = useState("")
    const [editModal,setEditModal] = useState(false)
    const addWish = () => {
      setValue_( prev => [...prev,data] )
    }
    const genNewId = () => {
      let id = uuid(`${new Date()}`)
      setLast(id)
      console.log({last:last,id:id})
      if(id === last){
         id += uuid()

      }
      return id
    }
    const verify = () => {
      const detected = value.filter((item => item.id === data.id))
      //console.log(detected)
      return detected
    }
    const cartItem = () => {
      const truth = verify()
    if(truth.length === 0){
      data.cartId = genNewId()
      setValue(prev => [...prev,data])
      setValueTotal(value_total + data.price)
    }else{
      showNotification({
        title:"Item Exists!!!",
        message:'Sorry but this item is already in your cart.'
      })
    }

    }
    const mockdata = [
      { label: data.quantity, icon: IconNumber }
    ]
    const features = mockdata.map(feature => (
      <Center key={feature.label}>
        <feature.icon size={18} className={classes.icon} stroke={1.5} />
        <Text size="xs">Remaining  {feature.label}  items</Text>
      </Center>
    ))
   const deleteProduct = () => {
    setR(true)
    deleteDoc(doc(db,"products",data.id)).then( () => {
      showNotification({
        title:'DELETING ....',
        message:'Removing product from inventory...'
      })
    axios.post('/api/delete',{ url:data.images }).then(() => {
      showNotification({
        title:'DELETED',
        message:'Product removed from inventory...'
      })
      setR(false)
    })
    })
   }
   const mockdata_ = [
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
   const form = useForm({
    initialValues: {
      name: data.name,
      description:data.description,
      price:data.price,
      Iprice:data.Iprice ? data.Iprice : 0,
      category:data.category,
      quantity:data.quantity,
      discount:data.discount ? data.discount : 0,
    },
  });
   const [editing,setEditing] = useState(false)
   const editProduct = () => {
    setEditing(true)
    setDoc(doc(db,"products",data.id),{
      ...form.values
    },{ merge:true }).then( () => {
      showNotification({
        title:'Updated ....',
        message:'Updated product from inventory...'
      })
      setEditing(false)
    })
   }
   useEffect(() => {
  
     data.images.map( img => {
      let str = []
       img.length !==0 && str.push(img)
       return str
     } )
   },[])
    return (
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image src={data.images[0].replace(/[\[\]"]+/g,'')} height={200} alt={data.name} />
        </Card.Section>
       <Card.Section>
       <Badge m={10} size="sm" style={{cursor:"pointer"}} onClick={() => SetOpen(true)} >{data.name.slice(0,40)} ...</Badge>
         {/* <Text onClick={() => SetOpen(true)} style={{cursor:'pointer',textDecoration:'underline'}} weight={500}>{data.name.slice(0,50)}</Text>*/}
            <Text size="xs" m={10} color="dimmed">
              {data.description.slice(0,180)}
            </Text>
        </Card.Section>
        <Card.Section className={classes.section} mt="md">  
          <Group spacing={8} position="apart" mb={-8}>
             {features}
             <div>
              <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                ${data.price}
              </Text>
            </div>
          </Group>
        </Card.Section>
  
        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <Button leftIcon={<IconShoppingCartPlus  />} onClick={cartItem} radius="md" style={{ flex: 1 }}>
              Add to Cart
            </Button>
           
            {
              data.author === user?.uid && 
              <Button radius="md" color="red" style={{ flex: 1 }} onClick={deleteProduct} loading={removing}>
               Remove Product
            </Button>
            }
          </Group>
        
        </Card.Section>
        <Drawer
         opened={open}
         onClose={() => SetOpen(false)}
         title={data.name}
         padding="xl"
         size="xl"
        >
          <Divider mb={10}/>
         <ScrollArea style={{height:'100%',paddingBottom:20}}>
       
      <div>
            <Text size="xs" color="dimmed">
              {data.description}
            </Text>
          </div>
      <Group spacing={30} p={20}>
            <Button leftIcon={<IconShoppingCartPlus  />} onClick={cartItem} radius="md" style={{ flex: 1 }}>
              Add to Cart
            </Button>
            <ContactUsButton item={data.name} id={data.id} />
            {
              user && 
              <Button radius="md" variant="light" color="red" style={{ flex: 1 }} onClick={addWish} leftIcon={<IconGif />}>
               Add to wish list
            </Button>
            }
            {
              data.author === user?.uid || user?.uid == "hcPzeL6ejYNv9aszafkivYi9G3C3" ?
              <Button radius="md" color="green" style={{ flex: 1 }} onClick={() => setEditModal(true)} loading={editing}>
               Edit Product
            </Button> : ""
            }
            {
              data.author === user?.uid  || user?.uid == "hcPzeL6ejYNv9aszafkivYi9G3C3" ?
              <Button radius="md" color="red" style={{ flex: 1 }} onClick={deleteProduct} loading={removing}>
               Remove Product
            </Button>  : ""
            }
          </Group>
          <Divider mb={10}/>
         <Carousel
          slideSize="100%"
          align="center"
          slidesToScroll={mobile ? 1 : 1}
          withControls
          
           >
           {
          data.images.length !== 0 && 
         data.images.map(item => (
        <Carousel.Slide key={item}>
          <div style={{height:'250px',margin:10,borderRadius:10,backgroundImage:`url(${item.replace(/[\[\]"]+/g,'')})`,backgroundPosition:'center',backgroundSize:'cover'}}>

          </div>
        </Carousel.Slide>
          ))
        
        }
        </Carousel>
         </ScrollArea>

        </Drawer>
        <Modal opened={editModal} onClose={() => setEditModal(false)}>
        <TextInput withAsterisk label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <Select
     label="Category" placeholder="Category" 
      itemComponent={SelectItem}
      data={mockdata_}
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
    {user?.uid == "hcPzeL6ejYNv9aszafkivYi9G3C3" &&
    <NumberInput
      mt="md"
      withAsterisk
      {...form.getInputProps('Iprice')}
      label="Price International"
      defaultValue={10}
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value))
          ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : '$ '
      }
    />}
      <TextInput mt="md" label="Discount" placeholder="25% off 12,000" {...form.getInputProps('discount')} />

      <Button mt={10} disabled={form.values.name === data.name && form.values.category === data.category && form.values.description === data.description && form.values.price === data.price && form.values.quantity === data.quantity && form.values.discount === data.discount && form.values.Iprice === data.Iprice ? true : false } loading={editing} onClick={editProduct}>
        Edit
      </Button>
        </Modal>
      </Card>
    )
  }
  