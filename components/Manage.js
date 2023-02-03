import { Grid, Paper } from '@mantine/core'
import React from 'react'
import FeaturesCard from './Product'

const ProductS = ({products}) => {
  return (
   <Paper p={10}>
   <Grid>
   {
    products.length !== 0 &&
     products.map( item => (
        <Grid.Col lg={4} md={4} sm={12} xs={12}>
            <FeaturesCard  key={item.author} data={item}  admin={true}/>
        </Grid.Col>
     ) )
    }
   </Grid>
   </Paper>
  )
}

export default ProductS