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
    Button,
    Divider,
    useMantineTheme,
    createStyles,
    SimpleGrid,
    UnstyledButton,
    ThemeIcon
  } from "@mantine/core"
  import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  import  app  from '../database/Firebase'
  import { useAuthState } from "react-firebase-hooks/auth";
  import { useForm } from "@mantine/form";
  import { showNotification } from "@mantine/notifications";
  import { getFirestore, collection, query, where, getDocs, setDoc,doc } from "firebase/firestore";  
  import { useState } from "react";
  import Head  from 'next/head'
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconTrees,
    IconHandGrab,
    IconSun, IconMoon, IconSearch, IconHome, IconDashboard, IconFileText, IconShoppingCart, IconToolsKitchen, IconHeartHandshake, IconShirt, IconEmpathize, IconShirtSport, IconRazorElectric, IconTool, IconPig, IconBrandOffice, IconGrillFork, IconSignal5g, IconBrush, IconPlaneInflight
  } from "@tabler/icons"
  const useStyles = createStyles(theme => ({
    link: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      textDecoration: "none",
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
  
      [theme.fn.smallerThan("sm")]: {
        height: 42,
        display: "flex",
        alignItems: "center",
        width: "100%"
      },
  
      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0]
      })
    },
  
    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
  
      ...theme.fn.hover({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[0]
      }),
  
      "&:active": theme.activeStyles
    },
  
    dropdownFooter: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      margin: -theme.spacing.md,
      marginTop: theme.spacing.sm,
      padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
      paddingBottom: theme.spacing.xl,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
      }`
    },
  
    hiddenMobile: {
      [theme.fn.smallerThan("sm")]: {
        display: "none"
      }
    },
  
    hiddenDesktop: {
      [theme.fn.largerThan("sm")]: {
        display: "none"
      }
    }
  }))


  const mockdata = [
    {
      icon: IconRazorElectric,
      title: "Electronics",
      description: "Find electrical appliances."
    },
    {
      icon: IconTool,
      title: "Tools & Home Improvement",
      description: "Find tools to get productive."
    },
    {
      icon: IconPig,
      title: "Pet Supplies ",
      description: "Database of pet supplies"
    },
    {
      icon: IconBrandOffice,
      title: "Office Products ",
      description: "Fill your office with accessories."
    },
    {
      icon: IconTrees,
      title: "Garden & Outdoor",
      description: "Great tooling for your garden"
    },
    {
      icon: IconGrillFork,
      title: "Grocery & Gourmet Food",
      description: "Shop for groceries online"
    },
    {
        icon: IconHandGrab,
        title: "Handmade",
        description: "Hand crafted products."
      },
      {
        icon: IconSignal5g,
        title: "Cell Phone & Accessories",
        description: "Accessorise with  tones of gadgets"
      },
      {
        icon: IconPlaneInflight,
        title: "Luggage & Travel Gear	",
        description: "All you need to travel"
      },
      {
        icon:IconBrush,
        title:'Collectibles & Fine Art',
        description:'Find well delailed collections'
      }
  ]
  
  
  export default function AuthenticationTitle() {
    const { classes, theme } = useStyles()
     const links = mockdata.map(item => (
        <UnstyledButton className={classes.subLink} component="a" href={`/category/${item.title}`} key={item.title}>
          <Group noWrap align="flex-start">
            <ThemeIcon size={34} variant="default" radius="md">
              <item.icon size={22} color={theme.fn.primaryColor()} />
            </ThemeIcon>
            <div>
              <Text size="sm" weight={500}>
                {item.title}
              </Text>
              <Text size="xs" color="dimmed">
                {item.description}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      ))
    return (
      <Container size={520} my={40}>
        <Head>
          <title>
            Browse  Categories
          </title>
          </Head>
          <div sx={{ overflow: "hidden" }}>
            <Divider
            my="sm"
            mx="-md"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <SimpleGrid cols={2} spacing={0}>
            {links}
            </SimpleGrid>

            <div className={classes.dropdownFooter}>
            <Group position="apart">
                <div>
                <Text weight={500} color={theme.colorScheme === "dark" ? "gray.5" : "dark.5"} size="sm">
                    Get started
                </Text>
                <Text size="xs" color="dimmed">
                  Join our rich and equiped market place and start selling.
                </Text>
                </div>
                <Button variant="default" component="a" href="/login">Get started</Button>
            </Group>
            </div>
          </div>
    
      
      </Container>
    )
  }
  