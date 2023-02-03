import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    Group,
    Image
  } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import app from '../database/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { arrayUnion, collection, getDocs, getFirestore, query, setDoc, where,doc, orderBy, onSnapshot,increment } from 'firebase/firestore'
import { showNotification } from "@mantine/notifications";
  
  const useStyles = createStyles(theme => ({
    root: {
      paddingBottom: 120,
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor
      }).background
    },
  
    inner: {
      position: "relative"
    },
  
    image: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      zIndex: 0,
      opacity: 0.45,
      height:'100%'
    },
  
    content: {
      paddingTop: 220,
      position: "relative",
      zIndex: 1,
  
      [theme.fn.smallerThan("sm")]: {
        paddingTop: 120
      }
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      textAlign: "center",
      fontWeight: 900,
      fontSize: 38,
      color: theme.white,
  
      [theme.fn.smallerThan("sm")]: {
        fontSize: 32
      }
    },
  
    description: {
      maxWidth: 460,
      margin: "auto",
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl * 1.5,
      color: theme.colors[theme.primaryColor][1]
    }
  }))
  
  export default function ServerOverload() {
    const { classes } = useStyles()
    const auth = getAuth(app)
    const db = getFirestore(app) 
    const [user, loadingA, error] = useAuthState(auth);
    const [value, setValue] = useLocalStorage({ key: 'shopping-cart', defaultValue:[]});
    const [value_total, setValueTotal] = useLocalStorage({ key: 'shopping-cart-totals', defaultValue:0});
    useEffect(() => {
     if(value.length  !== 0 ){
      value.map(something => {
        setDoc(doc(db,"products",something.id),{
          quantity:increment(-1)
        },{ merge:true }).then( res => {
          showNotification({
            title:"Cleaning up your cart..",
            message:'Cart cleaning complete'
          })
        } )
      })
      setValue([])
      setValueTotal(0)
     }
    },[value])
    return (
      <div className={classes.root}>
          <div className={classes.inner}>
            <Image src='/3-01.jpg' className={classes.image} />
            <div className={classes.content}>
              <Title className={classes.title}>All Done</Title>
              <Text size="lg" align="center" className={classes.description}>
               Yaaaay!!!  Your Payment Process Has Completed Succesfully. 
              </Text>
              <Group position="center">
                <Button component="a" href="/" size="md" variant="white">
                  Shop More 
                </Button>
              </Group>
            </div>
          </div>
      </div>
    )
  }
  