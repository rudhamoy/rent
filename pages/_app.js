import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import { wrapper } from '../redux/store'
import Script from 'next/script'
import Head from 'next/head'
import Pixel from '../components/Pixel'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>RentmeRoom </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>
      <Script
        // strategy="lazyOnload"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google_analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        `}
      </Script>

      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
      <Pixel name='FACEBOOK_PIXEL_1' />
      <Layout />
    </>
  )
}


export default wrapper.withRedux(MyApp)
