import { Avatar, Button, Drawer, Indicator,Modal,ScrollArea, Select, Stepper, TextInput,Group,Text, Center, Container } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconError404, IconShoppingCart, IconVariablePlus } from '@tabler/icons'
import React, { forwardRef, useEffect, useState } from 'react'
import UserInfoIcons from './CartItem'
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios'
import { showNotification } from '@mantine/notifications'
import  app  from '../database/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth'
import { useForm } from '@mantine/form'
import CountryList from 'country-list-with-dial-code-and-flag'
import { COUNTRIES } from './c'
import { loadScript } from "@paypal/paypal-js";
import { PayPalButton } from "react-paypal-button-v2";
import { useRouter } from 'next/router'



const Cart = () => {
  const auth = getAuth(app)
  const router = useRouter()
  const [user, loadingA, error] = useAuthState(auth);
    const [countries,setCs] = useState(() => COUNTRIES.map( country => {
      country.label = country.name
      country.value = country.name 
      return country
     }))

    const [errorMessage, setErrorMessage] = useState(null);
    //api
    const [opened,setOpened] = useState(false)
    const [cart,setCart] = useState(0)
    const [value, setValue] = useLocalStorage({ key: 'shopping-cart', defaultValue:[]});
    const [value_total, setValueTotal] = useLocalStorage({ key: 'shopping-cart-totals', defaultValue:0});
    const  [total,setTotal] = useState(0)
    const [calculating,setCalc] = useState(false)
    const [checking,setClick] = useState(false)
    const [secret,setS] = useState('')
    const [ci,setC] = useState(false)
    const [check,setCheck] = useState(false)
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const options = {
      // passing the client secret obtained in step 3
      clientSecret: secret,

    };
    const form = useForm({
      initialValues: {
        name: null,
        addressOne:null,
        addressTwo:null,
        zip:null,
        phone:null,
        city:null,
        country:null,
        zipCode:null
      },
    });
    const getIntent = () => {
      loadScript({ "client-id": "AdDOl_zO5Pzs2pe7UsZjo6OxdhnGAsiM6FfMeOpt6o3eUk8Gi_WfKaVweZoPJHBejMBbpudm6ozZm53c" })
      .then((paypal) => {
        setC(true)
          // start to use the PayPal JS SDK script
      })
      .catch((err) => {
          console.error("failed to load the PayPal JS SDK script", err);
      });

    }
  const start = () => {
    setCheck(true)
    getIntent()
  }
  return (
    <div>
   <Indicator size={17} inline showZero={false} label={value.length}>
   <Avatar onClick={() => setOpened(true)} style={{cursor:'pointer'}} color="brown" radius="sm" size="md">
        <IconShoppingCart size={24} />
    </Avatar>
   </Indicator>
    <Drawer
       opened={opened}
        onClose={() => setOpened(false)}
        title="My Cart"
        padding="xl"
        size="xl"
      >
      {
        user ?
        <div>
        {
         value.length !== 0 &&  
         <Button mt={10} mb={10} variant="light" onClick={start} fullWidth leftIcon={<IconShoppingCart />} loading={ci}>
         Check out {value.length} { value.length === 1 ? "item" : 'items' }(  Total:${ value_total.toFixed(2) } )
         </Button>
        }
       {
        router.query.country
       }
         <ScrollArea style={{height:'90%',width:'100%',paddingBottom:20}} offsetScrollbars>
         {
             value.length !== 0 &&
             value.map( data => (
                 <UserInfoIcons   avatar={data.images[0]} id={data.id} name={data.name} get={data.get} quantity={data.quantity} email={`${data.quantity} remaining`} phone={data.price}/>
             ) )
         }
         </ScrollArea>
        </div>:
        <div style={{height:"80%",display:'flex',alignItems:'center',justifyContent:'center'}}>
               <Button component='a' href='/login'  leftIcon={<IconError404 />} color="red" variant='light'>
                Please Login To Proceed To Cart
              </Button>
        </div>
      }
      </Drawer>

      <Modal
      opened={check}
      onClose={() => setCheck(false)}
      title="Check Out"
      fullScreen
      >
       <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Enter Shipping Details" allowStepSelect={active > 0}>
        <form>
        <TextInput withAsterisk label="Name" placeholder="What is you name ?" {...form.getInputProps('name')} />
    <Select
     label="Country" placeholder="Country" data={countries}
      searchable
      maxDropdownHeight={300}
      nothingFound="Nothing here"
      {...form.getInputProps('country')}
      filter={(value, item) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim())
      }
      
    />
      <TextInput withAsterisk mt="md"  label="Address Line 1" placeholder="Address Line 1" {...form.getInputProps('addressOne')} />
      <TextInput withAsterisk mt="md"  label="Address Line 2" placeholder="Address Line 2" {...form.getInputProps('addressTwo')} />
      <TextInput withAsterisk mt="md"  label="Phone" placeholder="Phone" {...form.getInputProps('phone')} />
      <TextInput withAsterisk mt="md"  label="City" placeholder="City" {...form.getInputProps('city')} />
      <TextInput withAsterisk mt="md"  label="Zip Code" placeholder="Zip Code" {...form.getInputProps('zipCode')} />
         </form>
          <Button mt={10} onClick={nextStep} fullWidth disabled={!form.values.name || !form.values.addressOne || !form.values.addressTwo || !form.values.city || !form.values.country || !form.values.phone || !form.values.zipCode ? true : false }>
            Proceed to payment
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Payment" allowStepSelect={active > 1}>
        <Container p={20} >
        <PayPalButton
         amount={value_total}
         // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
         onSuccess={(details, data) => {
            console.log(data)
           alert("Transaction completed by " + details.payer.name.given_name);
 
           // OPTIONAL: Call your server to save the transaction
           /*return fetch("/paypal-transaction-complete", {
             method: "post",
             body: JSON.stringify({
               orderID: data.orderID
             })
           }); */
         }}
       />
        </Container>
        </Stepper.Step>
      </Stepper>

      </Modal>

    </div>
  )
}

export default Cart