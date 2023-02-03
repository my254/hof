import { Avatar, Button, Drawer, Indicator,ScrollArea } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconError404, IconGift, IconVariablePlus } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import UserInfoIcons from './Product'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import  app  from '../database/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth'


const Cart = () => {
  const auth = getAuth(app)
  const [user, loadingA, error] = useAuthState(auth);
    const [errorMessage, setErrorMessage] = useState(null);
    //api
    const [opened,setOpened] = useState(false)
    const [cart,setCart] = useState(0)
    const [value, setValue] = useLocalStorage({ key: 'wish-cart', defaultValue:[]});
    const  [total,setTotal] = useState(0)
    const [calculating,setCalc] = useState(false)
    const [checking,setClick] = useState(false)
    const [secret,setS] = useState('')
    const [ci,setC] = useState(false)
    const options = {
      // passing the client secret obtained in step 3
      clientSecret: secret,

    };
    const getIntent = () => {
      setC(true)
      axios({
        method:'POST',
        url:'/api/pay',
        data:{ price:value_total * 100 }
      }).then( res => {
        //console.log(res.data.client_secret.client_secret)
        setC(false)
        setS(res.data.client_secret.client_secret)
        showNotification({
          title:"Begin Payment Process",
          message:"Client Secret initialized"
        })
        
      })

    }

  return (
    <div>
   <Indicator size={17} inline label={value.length}>
   <Avatar onClick={() => setOpened(true)} style={{cursor:'pointer'}} color="brown" radius="sm" size="md">
        <IconGift size={24} />
    </Avatar>
   </Indicator>
    <Drawer
       opened={opened}
        onClose={() => setOpened(false)}
        title="My Wishlist"
        padding="xl"
        size="xl"
      >
      {
        user ?
        <div style={{height:'100%'}}>
         <ScrollArea style={{height:'90%',width:'100%',paddingBottom:20}} offsetScrollbars>
         {
             value.length !== 0 &&
             value.map( data => (
                 <UserInfoIcons    key={data.id} data={data}/>
             ) )
         }
         </ScrollArea>
        </div>:
        <div style={{height:"80%",display:'flex',alignItems:'center',justifyContent:'center'}}>
               <Button component='a' href='/login'  leftIcon={<IconError404 />} color="red" variant='light'>
                Please Login To View Wish List
              </Button>
        </div>
      }
      </Drawer>

    </div>
  )
}

export default Cart