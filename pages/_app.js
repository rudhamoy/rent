import 'tailwindcss/tailwind.css'
import Layout from '../components/layout'
import { wrapper } from '../redux/store'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="lazyOnLoad"
      />
      <Script strategy="lazyOnLoad">
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
