import {
    Menu,
    Group,
    Text,
    Avatar,
    useMantineTheme,
    ActionIcon,
    Tooltip,
    Loader
  } from "@mantine/core"
  import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronRight,
    IconDots
  } from "@tabler/icons"
import { getAuth } from "firebase/auth";
import { collection,getDocs,getFirestore,query,where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../database/Firebase";
  
  export default function UserMenu() {
    const theme = useMantineTheme()
    const auth = getAuth(app)
    const [user, loadingA, error] = useAuthState(auth);
    const db = getFirestore(app)
    const [data,setData] = useState({
      name:'',
      dp:'',
      hero:'',
      description:''
    })
    const [assets,setNotifs] = useState([])
    const [fetch,setF] = useState(false)
    const fetchUser = async () => {
      setF(true)
      try {
        const q = query(collection(db,"users"),where("uid", "==", user?.uid))
       const query_r = await getDocs(q);
       setData({name:query_r.docs[0].data()?.name,dp:query_r.docs[0].data()?.dp,hero:query_r.docs[0].data()?.hero,description:query_r.docs[0].data()?.description})
       
      } catch (err) {
        console.error(err);
       
      }
      setF(false)
    }
    useEffect(() => {
      if(user && !loadingA){
        fetchUser()
      }
     
    },[user,loadingA])
    return (
      <Group position="center">
        <Menu withArrow width={300} position="bottom" transition="pop">
          <Menu.Target>
          {
            !loadingA ?
            <Tooltip label="Logged in User" withArrow>
          <Avatar src={data.dp} size="md" variant="filled" radius="sm" />
        </Tooltip>
        :
        <Loader size="sm"/>
          }
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item rightSection={<IconChevronRight size={14} stroke={1.5} />}>
              <Group>
                <Avatar
                  radius="xl"
                  src={data.dp}
                />
  
                <div>
                  <Text weight={500}>{data.name}</Text>
                  <Text size="xs" color="dimmed">
                    {user.email}
                  </Text>
                </div>
              </Group>
            </Menu.Item>
  
            <Menu.Divider />
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item component="a" href={user && `/user/${user.uid}`} icon={<IconSettings size={14} stroke={1.5} />}>
              Account settings
            </Menu.Item>
            <Menu.Item onClick={() => auth.signOut()} icon={<IconLogout size={14} stroke={1.5} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    )
  }
  