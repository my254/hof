import { createStyles, Card, Avatar, Text, Group, Button,Modal,TextInput, FileButton, Progress } from "@mantine/core"
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons";
import { useState } from "react";
import app from '../database/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";


const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`
  }
}))

export default function UserCardImage({name,email,hero,dp,reset,data:user_state}) {
    const router = useRouter()
    const { id } = router.query
    const auth = getAuth(app)
    const db = getFirestore(app)
    const [user, loadingA, error] = useAuthState(auth);
    const [opened, setOpened] = useState(false);
    const [editing,setEditing] = useState(false)
    const [sending,setS] = useState(false)
    const form = useForm({
        initialValues: {
          name: name,
          description:''
        },
      });
 const data = 
 {
    "image": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    "avatar": "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "name": "Mukindas ",
    "job": "Product sales",
    "stats": [
      {
        "value": "34K",
        "label": "Products Uploaded"
      },
      {
        "value": "187",
        "label": "Products Sold"
      },
      {
        "value": "1.6K",
        "label": "Products Remaining"
      }
    ]
  }
  const [progress,setProgress] = useState({
    i:'',
    total:'',
    upload:''
  })
  const upload = (e) => {
    //axios.post(`/upload-prop-img/${uuid()}`)
    if(dp) {
      axios.post('/api/delete',{ url: [dp] }).then(() => {
        showNotification({
          title:'DELETED,UPDATED',
          message:'Changes are complete'
        })
      })
    }
    setS(true)
    console.log(e)
    const body = new FormData()
    body.append('file',e)
    axios({
      method: "POST",
      data:body,
      url: `/api/file`, // route name
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
      console.log(res.data.data)
      setDoc(doc(db,"users",user.uid),{
        dp:res.data.data
      },{merge:true}).then( () => {
      reset({...user_state,dp:res.data.data})
      showNotification({
        title:'Done',
        message:'Uploaded Successfully'
      })
      } )
     }).catch( (err) => {
      showNotification({
        title:'Error',
        message:'Upload Failed!!'
      })
     } )
     setS(false)
  }
  const upload_hero = (e) => {
    //axios.post(`/upload-prop-img/${uuid()}`)
    if(hero) {
      axios.post('/api/delete',{ url: [hero] }).then(() => {
        showNotification({
          title:'DELETED,UPDATED',
          message:'Changes are complete'
        })
      })
    }
    setS(true)
    console.log(e)
    const body = new FormData()
    body.append('file',e)
    axios({
      method: "POST",
      data:body,
      url: `/api/file`, // route name
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
      console.log(res.data.data)
      setDoc(doc(db,"users",user.uid),{
        hero:res.data.data
      },{merge:true}).then( () => {
      reset({...user_state,hero:res.data.data})
      showNotification({
        title:'Done',
        message:'Uploaded Successfully'
      })
      } )
     }).catch( (err) => {
      showNotification({
        title:'Error',
        message:'Upload Failed!!'
      })
     } )
     setS(false)
  }
  const { job, stats }  = data
  const { classes, theme } = useStyles()
  const submit = () => {
     setEditing(true)
    if(form.values.name.length > 2){
      setDoc(doc(db,"users",user.uid),{
        name:form.values.name
      },{ merge:true }).then(() => {
        setOpened(false)
        showNotification({
          title:'Edited',
          message:'Name Edited'
        })
      })
    }else if(form.values.description.length > 5){
      setDoc(doc(db,"users",user.uid),{
        description:form.values.description
      },{ merge:true }).then(() => {
        setOpened(false)
        showNotification({
          title:'Edited',
          message:'Description Edited'
        })
      })
    }
    setEditing(false)
  }

  const items = stats.map(stat => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ))

  return (
    <>
      <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${hero ? hero : ''})`, height: 140 }} />
      <Avatar
        src={dp ? dp : ''}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {
          data.description && data.description
        }
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
    {
      sending &&   <Progress value={progress.i} label={`${progress.i} %`} m={10} />
    }
      {
        user?.uid === id &&
        <Group mt="md" position="center" spacing={30}>
      <FileButton onChange={upload} accept="image/png,image/jpeg">
          {(props) => (
              <Button
              {...props}
              radius="md"
              mt="xl"
              size="md"
              color={theme.colorScheme === "dark" ? undefined : "dark"}
              leftIcon={<IconUpload />}
            >
             Upload Profile Photo
            </Button>
        )}
      </FileButton>
      <FileButton onChange={upload_hero} accept="image/png,image/jpeg">
          {(props) => (
              <Button
              {...props}
              radius="md"
              mt="xl"
              size="md"
              color={theme.colorScheme === "dark" ? undefined : "dark"}
              leftIcon={<IconUpload />}
            >
             Upload Banner
            </Button>
        )}
      </FileButton>
      </Group>
      }
     {
      user?.uid === id &&
      <Button
      fullWidth
      radius="sm"
      mt="xl"
      size="sm"
      color={theme.colorScheme === "dark" ? undefined : "dark"}
      onClick={() => setOpened(true)}
    >
     Edit Profile
    </Button>
     }
    </Card>
    <Modal
    opened={opened}
    onClose={() => setOpened(false)}
    title="Introduce yourself!"
     >
    {/* Modal content */}
      <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
      <TextInput label="Description" placeholder="Costume Designer" {...form.getInputProps('description')} />
      <Button
        fullWidth
        radius="sm"
        mt="xl"
        size="sm"
        color={theme.colorScheme === "dark" ? undefined : "dark"}
        onClick={submit}
        loading={editing}
      >
       Edit
      </Button>
   </Modal>
    </>
  )
}
