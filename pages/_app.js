import '../styles/App.css'
import dynamic from 'next/dynamic'
const ComponentWithNoSSR = dynamic(() => import('../components/Layaout'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  return <ComponentWithNoSSR><Component {...pageProps} /></ComponentWithNoSSR>
}

export default MyApp
