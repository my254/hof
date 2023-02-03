import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv='Content-Type' content='text/html; charset="utf-8' />         
            <style>
            font-family: 'Montserrat Alternates', sans-serif;
            </style>
            </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument