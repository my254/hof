import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button
  } from "@mantine/core"
  import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import  app  from '../database/Firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { getFirestore, collection, query, where, getDocs, setDoc,doc } from "firebase/firestore";  
import { useEffect, useState } from "react";
import Head  from 'next/head'
import { Router } from "next/router";

  export default function AuthenticationTitle() {
    const auth = getAuth(app)
    const db = getFirestore(app)
    const [loading,setLoading] = useState(false)
    const [user, loadingA, error] = useAuthState(auth);

    const form = useForm({
      initialValues: {
        name: '',
        email: '',
        password:''
      },
      validate: {
        name: (value) => (value.length < 4 ? 'Name  must more than 4 chars.' : null),
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value) => (value < 8 ? 'password cannot be less than 8 characters.' : null),
      },
    });
    const register = (values) => {
      setLoading(true)
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        let q = query(collection(db,"users"),where("uid",'==',user.uid))
        getDocs(q).then(async doc_ => {
         if(doc_.empty){
           await setDoc(doc(db,"users",user.uid),{
             uid: user.uid,
             name:values.name,
             email:values.email,
           }).then( () => {
            showNotification({
              title:'Welcome to the store',
              message:"Resister success",
              color:'green'
              })
              setLoading(false)
           } )
          
         }
       } )
       
        // ...
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        showNotification({
          title:errorCode,
          message:errorMessage,
          color:'red'
        })
      });
     
    }
    const handleError = () => {
      showNotification({
        title:'Incomplete !!',
        message:"Fill in all fields",
        color:'red'
      })
    }
    return (
      <Container size={420} my={40}>
        <Head>
          <title>
            Create an an Account
          </title>
        </Head>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
       Create an Account
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(register, handleError)}>
         <TextInput label="Name"  {...form.getInputProps('name')} placeholder="Name" required />
          <TextInput mt="md" label="Email"  {...form.getInputProps('email')} placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps('password')}
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor onClick={event => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button loading={loading} fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
        </Paper>
      </Container>
    )
  }
  