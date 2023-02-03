import { createStyles, Avatar, Text, Group, Button, ActionIcon } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks";
import { IconPhoneCall, IconAt, IconTrash, IconPlus, IconMinus } from "@tabler/icons"
import { useState } from "react";

const useStyles = createStyles(theme => ({
  icon: {
    color:
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`
  }
}))

export default function UserInfoIcons({ avatar, name, title, phone, email,id,quantity,get }) {
  const { classes } = useStyles()
  const [no,setNo] = useState( get ? get : 1)
  const [value, setValue] = useLocalStorage({ key: 'shopping-cart', defaultValue:[]});
  const [value_total, setValueTotal] = useLocalStorage({ key: 'shopping-cart-totals', defaultValue:0});
  const [value_no, setValueNo] = useLocalStorage({ key: `quantity-${id}`, defaultValue:1});
  const filter = function(){
    setValue((prev) => value.filter(item => item.id !== id))
    value.length !== 0 &&  setValueTotal(value_total - phone)
  }
  const add =() => {
    setValue((prev) => {
      prev.map( present => {
        if(present.id === id){
          present.get = no +1
        }
      } )
      return prev
    })
    setNo(no +1)
   setValueTotal(value_total + phone)

  }
  const remove =() => {
    
    setValue((prev) => {
      prev.map( present => {
        if(present.id === id){
          present.get = no - 1
        }
      } )
      return prev
    })
    setNo(no - 1)
    setValueTotal(value_total - phone)
    if(value_no === 0){
      filter()
    }
  }
  return (
    <div>
      <Group noWrap mt={5} mb={5}>
        <Avatar src={avatar.replace(/[\[\]"]+/g,'')} size={94} radius="md" />
        <div>
          <Text
            size="xs"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            color="dimmed"
          >
            {title} ( { no } )
          </Text>

          <Text size="sm" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>

            <Text size="sm" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <Text size="md" color="green" >
              ${phone}
            </Text>
            <Button variant="subtle" leftIcon={<IconTrash />} onClick={filter}>
              Remove item 
            </Button>
            <ActionIcon onClick={add} color="green" variant="light" disabled={no === quantity ? true : false}>
              <IconPlus />
            </ActionIcon>
            <ActionIcon onClick={remove} color="red" variant="light" disabled={no === 0 ? true : false}>
              <IconMinus />
            </ActionIcon>
          </Group>
        </div>
      </Group>
    </div>
  )
}
