import {
    createStyles,
    Text,
    Title,
    SimpleGrid,
    TextInput,
    Textarea,
    Button,
    Group,
    ActionIcon,
    Divider
  } from "@mantine/core"
  import {
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandInstagram,
    IconBrandWhatsapp
  } from "@tabler/icons"
import { useState } from "react"
  import { ContactIconsList } from "./Info"
  
  const useStyles = createStyles(theme => ({
    wrapper: {
      minHeight: 400,
      boxSizing: "border-box",
      backgroundImage: `linear-gradient(-60deg, ${
        theme.colors[theme.primaryColor][8]
      } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
      borderRadius:0,
      padding: theme.spacing.xl * 2.5,
  
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        padding: theme.spacing.xl * 1.5
      }
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: theme.white,
      lineHeight: 1
    },
  
    description: {
      color: theme.colors[theme.primaryColor][0], 
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: "100%"
      }
    },
  
    form: {
      backgroundColor: theme.white,
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg
    },
  
    social: {
      color: theme.white,
  
      "&:hover": {
        color: theme.colors[theme.primaryColor][1]
      }
    },
  
    input: {
      backgroundColor: theme.white,
      borderColor: theme.colors.gray[4],
      color: theme.black,
  
      "&::placeholder": {
        color: theme.colors.gray[5]
      }
    },
  
    inputLabel: {
      color: theme.black
    },
  
    control: {
      backgroundColor: theme.colors[theme.primaryColor][6]
    }
  }))
  
  const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram]
  
  export default function ContactUs() {
    const { classes } = useStyles()
    const [name,setName] = useState("")
    const [email,setE] = useState("")
    const [msg,setMsg] = useState("")
  
  
    const icons = social.map((Icon, index) => (
      <ActionIcon
        key={index}
        size={28}
        className={classes.social}
        variant="transparent"
      >
        <Icon size={22} stroke={1.5} />
      </ActionIcon>
    ))
  
    return (
      <div className={classes.wrapper}>
        <div id="aboutus" style={{width:"100%"}}>
        <Title mb={30} className={classes.title}>About us</Title>
        <Divider my="sm" />
        <Text className={classes.description} mt="sm" mb={30}>
        <strong> Hands of Africa</strong> is a premier online store for all your African handmade products.  
         Launched in July 2013, Hands of Africa hosts artisans from around the African continent in showcasing their unique products and accessories that you would never find in any other part of the world.  
        </Text>
        </div>
        <SimpleGrid
          cols={2}
          spacing={50}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <div>
            <Title className={classes.title}>Contact us</Title>
            <Divider my="sm" />
            <Text className={classes.description} mt="sm" mb={30}>
              Leave your email and we will get back to you within 24 hours
            </Text>
  
            <ContactIconsList variant="white" />
  
            <Group mt="xl">{icons}</Group>
          </div>
          <div className={classes.form}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
              value={email}
              onChange={e => setE(e.currentTarget.value)}
            />
            <TextInput
              label="Name"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
              placeholder="John Doe"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              value={msg}
              onChange={e => setMsg(e.currentTarget.value)}
              required
              label="Your message"
              placeholder="I want to order your goods"
              minRows={4}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
  
            <Group position="right" mt="md">
              <Button className={classes.control} disabled={name.length === 0 || email.length === 0 || msg.length === 0 ? true : false } component="a"  href={`https://api.whatsapp.com/send?phone=254733605566&text=Hi my name is ${name} and my email is ${email}.${msg}`}  leftIcon={<IconBrandWhatsapp /> }>Send message</Button>
            </Group>
          </div>
        </SimpleGrid>
      </div>
    )
  }
  