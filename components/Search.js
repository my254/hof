import { Center, Grid, Paper, Title } from '@mantine/core'
import React from 'react'
import FeaturesCard from './Product'

const ProductS = ({products}) => {
  return (
   <Paper p={10}>
   <Grid>
   {
    products.length !== 0 &&
     products.map( item => (
        <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <FeaturesCard  key={item.id} data={item} />
        </Grid.Col>
     ) )
    }
   </Grid>
   </Paper>
  )
}

export default ProductS