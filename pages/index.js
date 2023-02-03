import { Carousel } from "@mantine/carousel"
import { useLocalStorage, useMediaQuery } from "@mantine/hooks"
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Container,
  TextInput,
  Center,
  Avatar,
  Badge,
  Overlay,
  LoadingOverlay,
  Loader,
  Skeleton,
  Group,
  ActionIcon,
  Divider
} from "@mantine/core"

import Search from "../components/Search"
import app from '../database/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { arrayUnion, collection, getDocs, getFirestore, query, setDoc, where,doc, orderBy, onSnapshot,limit,startAfter } from 'firebase/firestore'
import { useEffect, useRef, useState } from "react"
import Autoplay from 'embla-carousel-autoplay';
import { IconHomeDollar, IconLoader, IconSearch, IconTrendingUp } from "@tabler/icons"
import FeaturesTitle from "../components/Desc"
import Head from "next/head"
import ContactUs from "../components/Contact"
import { v4 as uuid } from "uuid"
import { showNotification } from '@mantine/notifications'
import dynamic from 'next/dynamic'

const ProductS = dynamic(() => import("../components/ProductS")) 
const useStyles = createStyles(theme => ({
  card: {
    width:'100%',
    height:'90vh',
    backgroundSize: "cover",
    backgroundPosition: "center",
    gap:10
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.colors.teal,
    lineHeight: 1.2,
    fontSize: 42,
    marginTop: theme.spacing.xs
  },

  category: {
    color: "green",
    opacity: 1,
    fontWeight: 700,
    textTransform: "uppercase"
  }
}))

function Card({ image, title, category,price ,data}) {
  const { classes,theme } = useStyles()
  const [value, setValue] = useLocalStorage({ key: 'shopping-cart', defaultValue:[]});
  const [value_total, setValueTotal] = useLocalStorage({ key: 'shopping-cart-totals', defaultValue:0});
  const cartItem = () => {
    data.cartId = uuid()
  setValue(prev => [...prev,data])
  setValueTotal(value_total + price)
  }
  return (
    <Paper
      shadow="md"
      p="xl"
      radius={0}
      sx={{ backgroundImage: `url(/banner.jpg)`}}
      className={classes.card}
    >             
    
    </Paper>
  )
}

const data = [
  {
    image:
      "3-01.jpg",
    title: "Best forests to visit in North America",
    category: "nature"
  },
  {
    image:
      "3-01.webp",
    title: "Hawaii beaches review: better than you think",
    category: "beach"
  },
  {
    image:
      "1.jpg",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "nature"
  },
  {
    image:
      "2.jpg",
    title: "Aurora in Norway: when to visit for best experience",
    category: "nature"
  },
  {
    image:
      "3.jpg",
    title: "Best places to visit this winter",
    category: "tourism"
  }
]

export default function CardsCarousel() {
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const auth = getAuth(app)
  const db = getFirestore(app) 
  const [user, loadingA, error] = useAuthState(auth);
  const slides = data.map(item => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ))
  const [assets,setNotifs] = useState([])
  const [results,setR] = useState([])
  const [start,setStart] = useState(null)
  const [getting,setGetting] = useState(false)
  const get = () => {
    const ref4 = query( collection(db,"products"),orderBy("date","desc"))
    getDocs(ref4).then(result => {
    if(!result.empty){
      let items = []
      result.forEach(document => {
          let doc = document.data()
          doc.id = document.id
          items.push(doc)
          setStart(doc.date)
      });
      function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
      }
      shuffleArray(items)
      setNotifs(items)
    }else{
      setNotifs(null)
    }
    })
   }
   useEffect(() => {
   get()
   },[])
   const [search,setS] = useState('')
   const [searching,setSearch] = useState(false)
  return (
   <Skeleton visible={assets.length === 0 ? true : false}>
     <div style={{marginTop:80}}>
     <Carousel
      slideSize="100%"
      align="center"
      withIndicators={false}
      withControls={false}
    >
    {
      assets.length !== 0 && 
      assets.slice(0,1).map(item => (
    <Carousel.Slide key={item.title}>
      <Card category={item.category} data={item} title={item.name} price={item.price} image={item.images[0].replace(/[\[\]"]+/g,'')}/>
    </Carousel.Slide>
      ))
     
    }
    </Carousel>
    <Container p={20}>
    <div>
   
    <Divider my="sm" label={ <Badge variant="gradient" my={10} gradient={{ from: 'brown', to: 'gray' }} size="md" radius="md" leftSection={<ActionIcon mt={5} mb={5} size="xs" color="teal" variant="transparent"><IconTrendingUp size={12} /></ActionIcon> }>Our Featured Products</Badge>}></Divider>
        <ProductS products={assets.slice(0,3)}/>
      <Group position="center">
    </Group>
      </div>  
    </Container>
   <div>
    <div style={{marginTop:10}} id="contactus">
      <ContactUs />
    </div>
   </div>
   </div> 
   </Skeleton>
  )
}
