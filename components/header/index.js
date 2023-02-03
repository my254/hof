import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    useMantineColorScheme,
    SegmentedControl,
    Avatar,
    ActionIcon,
    Indicator,
    Accordion,
    LoadingOverlay,
  } from "@mantine/core"
  import { MantineLogo } from "@mantine/ds"
  import { useDisclosure } from "@mantine/hooks"
import { openSpotlight, SpotlightProvider } from "@mantine/spotlight"
import Router from 'next/router'
import Link from "next/link"
  import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconSun, IconMoon, IconSearch, IconHome, IconDashboard, IconFileText, IconShoppingCart, IconToolsKitchen, IconHeartHandshake, IconShirt, IconEmpathize, IconShirtSport, IconDiamond, IconMasksTheater, IconStars, IconHomeCog, IconKey
  } from "@tabler/icons"
import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import app from "../../database/Firebase"
import UserMenu from "../User"
import Cart from "../Cart"
import Wish from "../Wish"
  
  const useStyles = createStyles(theme => ({
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color :theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        color:'white',
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
          0.05
        ),
      },
    },
  
    subLink: {
      width: "100%",
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      borderRadius: theme.radius.md,
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
      icon: IconDiamond,
      title: "Jewelery",
      description: ["Earings","Necklaces","Bangles","Waist beads","Anklelets","Checkers"]
    },
    {
      icon: IconShirt,
      title: "Fabrics",
      description: ["Masai shawls ( shuka )","African swahili sarongs (kikoi)","Ankara bags"]
    },
    {
      icon: IconMasksTheater,
      title: "Traditional Artifacts",
      description: ["Clubs (Rungus)","Antique wooden masks","animal carvings (wooden ","soap stones)"]
    },
    {
      icon: IconStars,
      title: "Decors",
      description:[ "Planter baskets","Paintings"]
    },
    {
      icon: IconHomeCog,
      title: "Home",
      description: ["Dining table runners","dining table placemats","coasters","seviette holders ( beaded,wooden,soapstone )","coffe tables","outdoor benches","salad servers","salad bawls"]
    },
    {
      icon: IconKey,
      title: "Accessories",
      description: ["Keyholders","Fridge magnets","Bottle openers"]
    }
  ]
  
  export default function HeaderMegaMenu({toggleTheme,colorScheme}) {
    const auth = getAuth(app)
    const [user, loadingA, error] = useAuthState(auth);
    const [
      drawerOpened,
      { toggle: toggleDrawer, close: closeDrawer }
    ] = useDisclosure(false)
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
    const { classes, theme } = useStyles()
    const links = mockdata.map(item => (
      <Accordion variant="filled" m={10}>
         <Accordion.Item value={item.title} key={item.title}>
        <Accordion.Control>
           {item.title}
        </Accordion.Control>
        <Accordion.Panel>
         {
          item.description.map( desc => (
           <Link key={desc} href={`/category/${item.title}`}>
            <a>
            <UnstyledButton className={classes.subLink} m={10} key={desc}>
        <Group noWrap align="flex-start">
          <div>
            <Text size="sm" weight={500}>
              {desc}
            </Text>
            <Text size="xs" color="dimmed">
              {item.title}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
            </a>
           </Link>
          ) )
         }
        </Accordion.Panel>
      </Accordion.Item>
      </Accordion>
     
    ))
    const actions = [
      {
        title: 'Home',
        description: 'Get to home page',
        onTrigger: () => console.log('Home'),
        icon: <IconHome size={18} />,
      },
      {
        title: 'Dashboard',
        description: 'Get full information about current system status',
        onTrigger: () => console.log('Dashboard'),
        icon: <IconDashboard size={18} />,
      },
      {
        title: 'Documentation',
        description: 'Visit documentation to lean more about all Product Categories',
        onTrigger: () => console.log('Documentation'),
        icon: <IconFileText size={18} />,
      },
    ];
 
  const toggleColorScheme = () => {
    if(colorScheme === "dark"){
      toggleTheme('light')
    }else{
      toggleTheme('dark')
    }
  }
    return (
      <>
        <Header height={80}  px="md" style={{position:'fixed',background:'black',borderBottom:'none'}}>
          <Group position="apart" sx={{ height: "100%" }}>
            <img src="/hof.png"  alt="hands 0f africa logo" style={{width:60}}/>
            <Group
              sx={{ height: "100%" }}
              spacing={10}
              className={classes.hiddenMobile}
            >
              
              <Link href="/">
              <a  className={classes.link}>
                Home
              </a>
              </Link>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Text   component="span"  mr={5}>
                      Products
                      </Text>
                      <IconChevronDown
                        size={16}
                      />
                    </Center>
                  </a>
                </HoverCard.Target>
  
                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text weight={500} color={theme.colorScheme === "dark" ? "gray.5" : "dark.5"}>Browse Categories</Text>
                    <Anchor href="/categories" size="xs">
                      View all
                    </Anchor>
                  </Group>
  
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
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#aboutus" className={classes.link}>
                Why us ?
              </a>
              <a href="#contactus" className={classes.link}>
                Contact Us
              </a>
            </Group>
  
            <Group className={classes.hiddenMobile}>
           
            {
              user &&  <UserMenu />
            }
           {
            !user &&  
            <Link href="/login"> 
            <a>
            <Button  variant="default">Log in</Button>
            </a>
            </Link>
           }
             <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
              })}
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
            <Cart />    
            <Wish /> 
            </Group>
  
            <Group className={classes.hiddenDesktop}>
            {
              user &&  <UserMenu />
            }
            <Cart /> 
            <Burger
              color={theme.colors.brown[2]}
              opened={drawerOpened}
              onClick={toggleDrawer}
            />
            
            </Group>    
          </Group>
        </Header>
  
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Hands of-Africa"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea sx={{ height: "calc(100vh - 60px)" ,width:"100%"}} mx="-md" offsetScrollbars>
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />
  
         <Group position="apart" m={20}>
         <Link href="/" >
             <Button>
              Home
             </Button>
           </Link>
           {
            !user &&
            <Group position="center" grow pb="xl" px="md">
            <Link href="/login"> 
              <a><Button variant="default">Log in</Button></a>
            </Link>
           </Group>
          }
         </Group>
            {links}  
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />
            <Group position="center" grow pb="xl" px="md" style={{position:'absolute',bottom:10}}>
            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
              })}
            >
              {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
            </Group>
          </ScrollArea>
        </Drawer>
      </>
    )
  }
  