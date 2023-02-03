import {
    createStyles,
    Title,
    SimpleGrid,
    Text,
    Button,
    ThemeIcon,
    Grid,
    Col
  } from "@mantine/core"
  import {
    IconReceiptOff,
    IconFlame,
    IconCircleDotted,
    IconFileCode,
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconSun, IconMoon, IconSearch, IconHome, IconDashboard, IconFileText, IconShoppingCart, IconToolsKitchen, IconHeartHandshake, IconShirt, IconEmpathize, IconShirtSport, IconDiamond, IconMasksTheater, IconStars, IconHomeCog, IconKey
  } from "@tabler/icons"
  
  const useStyles = createStyles(theme => ({
    wrapper: {
      padding: `${theme.spacing.xl * 2}px ${theme.spacing.xl}px`
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: 36,
      fontWeight: 900,
      lineHeight: 1.1,
      marginBottom: theme.spacing.md,
      color: theme.colorScheme === "dark" ? theme.white : theme.black
    }
  }))
  const features= [
    {
      icon: IconDiamond,
      title: "Jewelery",
      description: "Earings,Necklaces,Bangles,Waist beads,Anklelets,Checkers"
    },
    {
      icon: IconShirt,
      title: "Fabrics",
      description: "Masai shawls ( shuka ),African swahili sarongs (kikoi),Ankara bags"
    },
    {
      icon: IconMasksTheater,
      title: "Traditional Artifacts",
      description: "Clubs,(Rungus),Antique wooden masks,animal carvings (wooden ,soap stones)"
    },
    {
      icon: IconStars,
      title: "Decors",
      description: "Planter baskets,Paintings"
    },
    {
      icon: IconHomeCog,
      title: "Home",
      description: "Dining table runners,dining table placemats,coasters,seviette holders ( beaded,wooden,soapstone ),coffe tables,outdoor benches,salad servers,salad bawls"
    },
    {
      icon: IconKey,
      title: "Accessories",
      description: "Keyholders,Fridge magnets,Bottle openers"
    }
  ]
  export default function FeaturesTitle() {
    const { classes } = useStyles()
  
    const items = features.map(feature => (
      <div key={feature.title}>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: "blue", to: "cyan" }}
        >
          <feature.icon size={26} stroke={1.5} />
        </ThemeIcon>
        <Text size="lg" mt="sm" weight={500}>
          {feature.title}
        </Text>
        <Text color="dimmed" size="sm">
          {feature.description}
        </Text>
      </div>
    ))
  
    return (
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
            Agile Multivendor eCommerce Software
            </Title>
            <Text color="dimmed">
            Delivering an industry-specific marketplace for businesses focused on building, sustaining, and improving their performance with a comprehensive multi-vendor e-Commerce platform. We provide scalable multi-vendor solutions tailored to your business needs to help you stay ahead in the competitive e-Commerce landscape.
            </Text>
  
            <Button
              variant="gradient"
              gradient={{ deg: 133, from: "blue", to: "cyan" }}
              size="lg"
              radius="md"
              mt="xl"
              component="a"
              href="/register"
            >
              Get started
            </Button>
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid
              cols={2}
              spacing={30}
              breakpoints={[{ maxWidth: "md", cols: 1 }]}
            >
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    )
  }
  