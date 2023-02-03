import { Carousel } from "@mantine/carousel"
import { useMediaQuery } from "@mantine/hooks"
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
  LoadingOverlay
} from "@mantine/core"
import ProductS from "../../components/ProductS"
import app from '../../database/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { arrayUnion, collection, getDocs, getFirestore, query, setDoc, where,doc, orderBy, onSnapshot, limit, startAfter } from 'firebase/firestore'
import { useEffect, useRef, useState } from "react"
import Autoplay from 'embla-carousel-autoplay';
import { IconHomeDollar, IconLoader, IconSearch } from "@tabler/icons"
import { useRouter } from "next/router"
import Head from "next/head"

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:'#00000054',
    backdropFilter:'blur(10px)',
    width:'100%',
    height:'60vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    gap:10
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: "green",
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs
  },

  category: {
    color: "green",
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase"
  }
}))

function Card({ image, title, category,price }) {
  const { classes } = useStyles()


  return (
    <Paper
      shadow="md"
      p="xl"
      sx={{ backgroundImage: `url(${image})` ,borderRadius:0}}
      className={classes.card}
    >
        
        <Title order={3} className={classes.title}>
          {title}
        </Title>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Badge sx={{ paddingLeft: 0 }} size="lg" radius="xl" color="teal" leftSection={<Avatar><IconHomeDollar /></Avatar>}>
        {price}
      </Badge>
      <Button variant="filled" color="green">
        Add To Cart
      </Button>
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
  const router = useRouter()
  const { category } = router.query
  const [user, loadingA, error] = useAuthState(auth);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [loading,setLoading] = useState(false)
  const slides = data.map(item => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ))
  const [assets,setNotifs] = useState([])
  const [start,setStart] = useState(null)
  const [getting,setGetting] = useState(false)
  const get = () => {
    const ref4 = query( collection(db,"products"),where("category","==",category),orderBy("date","desc"),limit(6))
    getDocs(ref4).then(result => {
      //console.log(result.)
    if(!result.empty){
      let items = []
      result.forEach(document => {
          let doc = document.data()
          doc.id = document.id
          console.log(doc)
          items.push(doc)
          setStart(doc.date)
      });
      setNotifs(items)
    }
    })
   }
   const getNext = () => {
    console.log(start)
    if(start){
      setGetting(true)
      const ref4 = query( collection(db,"products"),where("category","==",category),orderBy("date","desc"),startAfter(start),limit(6),)
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
   get()
   },[])
   const [search,setS] = useState(category)
   const SEARCHA = value => {
    //const query = new RegExp(value.currentTarget.value,'g')
    setS(value.currentTarget.value)
   if(search.length < 3){
    setNotifs(prev => prev.filter( item => item.category  === search || item.category.includes(search.toLocaleLowerCase().trim()) || item.description.includes(search.toLocaleLowerCase().trim())))
   }else{
    get()
   }
   }
  return (
        <div style={{marginTop:80}}>
    <Head>
     <title>
      {
        category
      }
     </title>
    </Head>
    <Container p={20}>
      <Center>
      </Center>
    <TextInput mb={20}  size="md" disabled value={search} onChange={SEARCHA} placeholder="What are you seraching for ?" icon={<IconSearch  />} />
   {assets.length !== 0 ? 
    <ProductS products={assets}/>:
    <Center p={40}>
      <Title color="red">
        Nothing was found
      </Title>
     </Center>}
     <Button leftIcon={<IconLoader />} m={20} variant="light" onClick={getNext}>
      Load More
     </Button>
    </Container>

   </div> 
  )
}
