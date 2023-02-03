import { Title, Text, Container, Button, Overlay, createStyles } from '@mantine/core';
import Head from 'next/head'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundColor:"white",

    '@media (max-width: 520px)': {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: 'relative',
    marginTop:30,
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    marginBottom:20,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color:theme.colors.gray[8],
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4],
  },

  description: {
    color: theme.colors.gray[6],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important',
    },
  },
}));

export default function HeroImageBackground() {
  const { classes, cx } = useStyles();

  return (
   <div>
    <Head>
     <title>Privacy-Policy</title>
    </Head>
     <div className={classes.wrapper}>
      <div className={classes.inner}>
        <Title className={classes.title}>
           Our Privacy Policy
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
          We confidentially and securely store your entire personal information in accordance to our privacy policies.  The information gathered when setting up an account is only used for the purposes of billing and delivering your purchased products.  We have further put forward appropriate measures to protect this information from any unlawful or unauthorised bodies. <br /><br />
We however do not have access to your billing information as this is transferred securely to our card processing personnel who can only process it upon our request.  The card processing personnel are further not allowed to retain, store or share any of your information to anyone else.
          </Text>
        </Container>
      </div>
      <div className={classes.inner}>
        <Title className={classes.title}>
        Legal Notice
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
          Once you have made an order, you can cancel it within a period not exceeding five (5) days.  We will then reimburse you the full amount paid for the products.  In case you had made an order of different products and only a few of them have been cancelled, we will only reimburse you for the products cancelled.  However, you will be obliged to cater for the return costs of the products cancelled if the order had already been shipped.
The product(s) should then be returned as soon as possible and not necessarily in their original packaging.   But, they should still be in a condition whereby they can be resold.  Failure to do so gives us the right to ask for compensation.
<br /><br /><strong>Intellectual Property Rights</strong><br /><br />
The intellectual property rights of all the content in this site is solely licensed and owned to the Hands of Africa and should only be used by first getting permission from the owner.  Neither the content nor the graphics in this site should be reproduced, copied, used, downloaded or modified without our permission.
          </Text>
        </Container>
      </div>
      <div className={classes.inner}>
        <Title className={classes.title}>
        Terms & Conditions
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
          Please take a few minutes to go through these terms and conditions before placing an order on any of the products being sold through this site.  By placing an order on any of the products here in, we will be made to believe that you have read and agreed to our terms and conditions.    For future reference, print a copy of these terms and conditions.  In case you do not agree with any of our terms and conditions, kindly get in touch with our customer care department for any enquiries.<br /><br/>
We have the rights to both amend and revise the terms and conditions of our products from one time to another.  You will therefore be subject to adhere to the terms and conditions but forth at the time when ordering your products.
          </Text>
        </Container>
      </div>
      <div className={classes.inner}>
        <Title className={classes.title}>
        DELIVERY METHODS
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
Expedited delivery is made on all products sold locally and internationally provided via DHL Express. The service takes three to five (3-5) working days.  The period may however be extended in case there is a weekend or public holiday in between the 3-5 day period.<br /><br />

<strong>PREFERRED CURRENCY</strong><br /><br />
We accept different forms of payments including VISA, Master Card, American Express PayPal 
When making your payment, make sure that you provide your full name as it appears on your card or account as well as your billing corresponds.
The preferred and acceptable currency is US dollars (US $) and where applicable, you will be charged in accordance to the current dollar exchange rate.
Card fraudsters will be prosecuted.
<br /><br /><strong>How to make an Order</strong><br /><br />
    • Select the products you intend to purchase and click on the ‘Add to Cart” button
    <br /><br /> • Enter the quantity of products you wish to purchase.  To make custom orders, kindly contact us to assist you with your order
    <br /><br /> • Before ‘Checking Out’, review the products purchased to make sure that they meet your personal specifications in terms of color, size and others.
    <br /><br />• In case you are a new user, you will be required to first create an account by simply entering your email account, creating a user name and a strong password.  Then, you can set up the rest of your account later by entering your personal details such as your billing and shipping address.  This should be kept confidential as it will help safeguard your account from third party access.
    <br /><br />• Lastly, you will be directed to a secure payment page that will require you to enter the method of payment that you’ll be using.  We will then send you an automated email to acknowledge that we have received your order.

          </Text>
        </Container>
      </div>
      <div className={classes.inner}>
        <Title className={classes.title}>
        COST OF PRODUCTS
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
          
The cost of the products may vary from time to time for we have the right to amend or withdraw any offers or prices at our very own discretion.  Since our site contains a load of products, at one time or another, you may discover an error in the pricing of the products you are interested in.  In case of any product mispricing, do not hesitate to inform us as soon as you can.  We will then help you towards reconfirming your order but at the right price.
We are at no liberty to sell incorrectly priced products and any incorrect price on the site is more likely to be an error.  Your cards will further not be charged until your order has been lined up for shipping.
<br /><br /><strong>SHIPPING METHOD</strong><br /><br />
Shipping is made available to all continents and in almost every country.  Shipping costs vary for they are highly determined by the product being bought, its weight and the type of packaging being used.  All additional import duties, charges or taxes are the buyer’s responsibility.  Therefore, first check with your country of residence’ custom offices and confirm whether you’ll have to pay additional costs before buying.
If your package is rejected or returned by the customs as a result of insufficient address, then, we will not be held reliable to refund your shipping fees. 

<br /><br /><strong>COST OF SHIPPING</strong><br /><br />
The shipping cost of all products will be mentioned within the item’s description.  Purchase of multiple products will enable you reduce the total cost of shipping.
Shipping costs will also be highly influenced by the mode of shipping chosen.  All packages are further insured with the carrier.  This insurance though is not included in the cost of shipping but is paid separately to the private insurance company.  Insurance is therefore included within the shipping cost of all products.
<br /><br /><strong>We hope that you enjoy purchasing</strong><br /><br />
          </Text>
        </Container>
      </div>
    </div>

   </div>
  );
}