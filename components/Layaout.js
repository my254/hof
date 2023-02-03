import React, { useState } from 'react'
import AppHeader from './header'
import { NextUIProvider } from '@nextui-org/react';
import FooterLinks from './Footer';
import { ColorSchemeProvider, MantineProvider, Paper } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Head from "next/head"

const Layaout = ({children}) => {
  const [theme,setTheme] = useState('light')
  return (
    <main>
      <Head>
    <title>
     Hands Of Africa
    </title>
    <meta httpEquiv='Content-Type' content='text/html; charset="utf-8' />
        <meta name='description' content='Hands of africa' />
        <meta name="language" content="English" />
        <meta name="keywords" content="Hands of Africa"/>
        <link rel = "canonical" href ="https://handsof-africa.com" />
        <meta name="robots" content="noydir" />
        <meta name='robots' content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/hof.png" /> 
    </Head>
    <MantineProvider theme={{colorScheme:theme,primaryColor:'brown',colors:{
      "brown":["#EFEBE9","#D7CCC8","#BCAAA4","#A1887F","#8D6E63","#795548","#6D4C41","#5D4037","#4E342E","#3E2723"]
    }}}>
     <NotificationsProvider>
     <Paper style={{borderRadius:0}}>
        <AppHeader toggleTheme={setTheme} colorScheme={theme}/>
        {children}
        <FooterLinks />
     </Paper>
     </NotificationsProvider>
    </MantineProvider>
    </main>
  )
}

export default Layaout