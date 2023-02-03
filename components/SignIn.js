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
  import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  import  app  from '../database/Firebase'
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useForm } from "@mantine/form";
  import { showNotification } from "@mantine/notifications";
  import { getFirestore, collection, query, where, getDocs, setDoc,doc } from "firebase/firestore";  
  import { useEffect, useState } from "react";
  import Head  from 'next/head'
  import Link from 'next/link'
import { Router, useRouter } from "next/router";
  
  export default function AuthenticationTitle() {
    const auth = getAuth(app)
    const router = useRouter()
    const db = getFirestore(app)
    const [loading,setLoading] = useState(false)
    const form = useForm({
      initialValues: {
        email: '',
        password:''
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value) => (value < 8 ? 'password cannot be less than 8 characters.' : null),
      },
    });
    const register = (values) => {
      setLoading(true)
       signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
          showNotification({
          title:"Login Success",
          message:"Welcome back ",
          color:'red'
        })
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
            Log in
          </title>
        </Head>
        <Title
          align="center"
          sx={theme => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}
        >
          Welcome back!
        </Title>
        <Link href="/register" size="sm" >
           <a style={{textDecoration:'none'}}>
        <Text color="dimmed" size="sm" align="center" mt={10}>
          Do not have an account yet ?  {"    "}
          
          <span style={{textDecoration:'underline'}}> Create account</span>
          
        </Text>
        </a>
          </Link>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(register, handleError)}>
          <TextInput  {...form.getInputProps('email')} label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
           {...form.getInputProps('password')}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
            <Anchor onClick={event => event.preventDefault()} href="#" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
          </form>
        </Paper>
      </Container>
    )
  }
  