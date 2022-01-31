import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import { wrapper } from '../redux/store'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>

      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="google_analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        `}
      </Script>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}


export default wrapper.withRedux(MyApp)
